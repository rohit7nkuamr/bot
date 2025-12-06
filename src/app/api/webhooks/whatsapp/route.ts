import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookToken, parseWhatsAppWebhook, sendWhatsAppMessage } from '@/lib/whatsapp';
import { parseLeadData, generateQualificationResponse } from '@/lib/gpt';
import { createLead, updateLeadParsedData } from '@/lib/leads';
import { supabaseServer } from '@/lib/supabase';

/**
 * WhatsApp Webhook Routes
 * GET: Verify webhook token
 * POST: Handle incoming messages
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');
    const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN;

    if (!verifyToken) {
      return NextResponse.json(
        { error: 'Webhook verify token not configured' },
        { status: 500 }
      );
    }

    const result = verifyWebhookToken(token || '', challenge || '', verifyToken);

    if (result) {
      return new Response(result);
    }

    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Webhook verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Parse incoming message
    const parsedMessage = parseWhatsAppWebhook(body);
    if (!parsedMessage) {
      return NextResponse.json(
        { success: true, message: 'No message to process' },
        { status: 200 }
      );
    }

    const { phoneNumber, text, contactName } = parsedMessage;

    // Get or create lead
    // Get or create lead and its associated user
    const { data: existingLead } = await supabaseServer
      .from('leads')
      .select('*, users(*)')
      .eq('phone', phoneNumber)
      .single();

    let lead = existingLead;

    if (!lead) {
      // Create new lead
      // This is a placeholder. In a real app, you'd have a system to map
      // incoming numbers to users, likely via an IndiaMART API key.
      // For now, we'll assign it to the first user.
      const { data: users } = await supabaseServer
        .from('users')
        .select('*')
        .limit(1);

      if (!users || users.length === 0) {
        console.error('No users found');
        return NextResponse.json(
          { success: true, message: 'No users found' },
          { status: 200 }
        );
      }

      const user = users[0];

      // Parse lead data using GPT, passing the user's plan
      const parsedData = await parseLeadData(
        text || 'Inquiry from WhatsApp',
        user.subscription_plan
      );

      // Create lead in database
      const { data: newLead } = await supabaseServer
        .from('leads')
        .insert({
          user_id: user.id,
          phone: phoneNumber,
          name: contactName || parsedData.name,
          raw_data: { message: text },
          parsed_data: parsedData,
          status: 'pending',
          budget: parsedData.budget,
        })
        .select()
        .single();

      lead = newLead;
    }

    // Generate response using GPT
    const response = await generateQualificationResponse(
      lead?.name || contactName || 'Lead',
      lead?.parsed_data?.requirements || 'Unknown',
      []
    );

    // Send response via WhatsApp
    await sendWhatsAppMessage(phoneNumber, response);

    // Store conversation
    if (lead?.id) {
      await supabaseServer.from('conversations').insert({
        lead_id: lead.id,
        messages: [
          {
            role: 'user',
            content: text,
            timestamp: new Date().toISOString(),
          },
          {
            role: 'assistant',
            content: response,
            timestamp: new Date().toISOString(),
          },
        ],
      });
    }

    console.log('Webhook processed successfully:', {
      phone: phoneNumber,
      name: contactName,
      message: text,
    });

    return NextResponse.json(
      { success: true, message: 'Webhook processed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
