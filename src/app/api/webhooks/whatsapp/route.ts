import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateAIResponse } from '@/lib/ai';
import { sendWhatsAppMessage, markMessageAsRead } from '@/lib/whatsapp';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'leadfilter_webhook_verify';

/**
 * GET: Webhook Verification (required by Meta)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify the webhook
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WhatsApp webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  }

  console.error('WhatsApp webhook verification failed');
  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

/**
 * POST: Receive incoming messages from Meta WhatsApp Cloud API
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Meta sends a different structure
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    // Check if this is a message notification
    if (value?.messages?.[0]) {
      const message = value.messages[0];
      const contact = value.contacts?.[0];

      const customerPhone = message.from; // e.g., "919876543210"
      const messageBody = message.text?.body || '';
      const messageId = message.id;
      const customerName = contact?.profile?.name || null;

      if (!customerPhone || !messageBody) {
        return NextResponse.json({ status: 'ok' }, { status: 200 });
      }

      console.log(`Received WhatsApp message from ${customerPhone}: ${messageBody}`);

      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Mark message as read
      await markMessageAsRead(messageId);

      // Store incoming message
      await supabase.from('conversations').insert({
        customer_phone: customerPhone,
        customer_name: customerName,
        role: 'user',
        content: messageBody,
        message_id: messageId,
      });

      // Fetch last 10 messages for context
      const { data: history } = await supabase
        .from('conversations')
        .select('role, content')
        .eq('customer_phone', customerPhone)
        .order('created_at', { ascending: true })
        .limit(10);

      // Format history for OpenAI
      const chatHistory = (history || []).map((msg: any) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

      // Generate AI Reply with full context
      const aiReply = await generateAIResponse(chatHistory);

      // Store AI response
      await supabase.from('conversations').insert({
        customer_phone: customerPhone,
        customer_name: customerName,
        role: 'assistant',
        content: aiReply,
      });

      // Send Reply via WhatsApp
      await sendWhatsAppMessage(customerPhone, aiReply);

      console.log(`AI replied to ${customerPhone}`);
    }

    // Handle message status updates (delivered, read, etc.)
    if (value?.statuses?.[0]) {
      const status = value.statuses[0];
      console.log(`Message ${status.id} status: ${status.status}`);
    }

    // Always return 200 OK to Meta
    return NextResponse.json({ status: 'ok' }, { status: 200 });

  } catch (error) {
    console.error('WhatsApp Webhook Error:', error);
    // Still return 200 to prevent Meta from retrying
    return NextResponse.json({ status: 'error handled' }, { status: 200 });
  }
}
