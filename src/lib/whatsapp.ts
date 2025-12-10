import twilio from 'twilio';

// Initialize Twilio Client with Managed Credentials (from env)
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const SENDER_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER; // e.g., 'whatsapp:+14155238886'

export async function sendWhatsAppMessage(to: string, body: string) {
  try {
    // Ensure 'to' number is in whatsapp format (e.g., 'whatsapp:+919876543210')
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    const formattedFrom = SENDER_NUMBER?.startsWith('whatsapp:') ? SENDER_NUMBER : `whatsapp:${SENDER_NUMBER}`;

    if (!SENDER_NUMBER) {
      console.error('TWILIO_WHATSAPP_NUMBER is not set in environment variables');
      return { success: false, error: 'Configuration Error' };
    }

    const message = await client.messages.create({
      from: formattedFrom,
      to: formattedTo,
      body: body,
    });

    console.log(`Message sent to ${to}: ${message.sid}`);
    return { success: true, sid: message.sid };
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    return { success: false, error };
  }
}
