import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateAIResponse } from '@/lib/ai';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: Request) {
  try {
    // 1. Parse content (Twilio sends form data)
    const formData = await request.formData();
    const From = formData.get('From') as string; // whatsapp:+91...
    const Body = formData.get('Body') as string; // User's message
    const ProfileName = formData.get('ProfileName') as string;

    if (!From || !Body) {
      return NextResponse.json({ error: 'Invalid Payload' }, { status: 400 });
    }

    // Extract phone number without whatsapp: prefix
    const customerPhone = From.replace('whatsapp:', '');
    console.log(`Received message from ${customerPhone}: ${Body}`);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 2. Store incoming message
    await supabase.from('conversations').insert({
      customer_phone: customerPhone,
      customer_name: ProfileName || null,
      role: 'user',
      content: Body,
    });

    // 3. Fetch last 10 messages for context
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

    // 4. Generate AI Reply with full context
    const aiReply = await generateAIResponse(chatHistory);

    // 5. Store AI response
    await supabase.from('conversations').insert({
      customer_phone: customerPhone,
      customer_name: ProfileName || null,
      role: 'assistant',
      content: aiReply,
    });

    // 6. Send Reply via Twilio
    await sendWhatsAppMessage(From, aiReply);

    // 7. Respond to Twilio (TwiML empty response)
    return new NextResponse('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

