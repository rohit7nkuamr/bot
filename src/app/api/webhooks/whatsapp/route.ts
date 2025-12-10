import { NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/ai';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

export async function POST(request: Request) {
  try {
    // 1. Parse content
    // content-type: application/x-www-form-urlencoded usually for Twilio
    const formData = await request.formData();
    const From = formData.get('From') as string; // whatsapp:+91...
    const Body = formData.get('Body') as string; // User's message
    const ProfileName = formData.get('ProfileName');

    if (!From || !Body) {
      return NextResponse.json({ error: 'Invalid Payload' }, { status: 400 });
    }

    console.log(`Received message from ${From}: ${Body}`);

    // 2. Fetch Chat History (Mock logic for now - in real app query Supabase 'conversations')
    // const history = await supabase.from('messages').select(...).eq('user', From)...
    const mockHistory: any[] = [
      { role: 'user', content: Body }
    ];

    // 3. Generate AI Reply
    const aiReply = await generateAIResponse(mockHistory);

    // 4. Send Reply via Twilio
    await sendWhatsAppMessage(From, aiReply);

    // 5. Respond to Twilio (TwiML or just 200 OK)
    // Twilio prefers TwiML but for just ACK, 200 OK XML is fine or even empty
    return new NextResponse('<Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
