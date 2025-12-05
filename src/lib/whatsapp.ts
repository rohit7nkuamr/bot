import twilio from 'twilio';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

// Initialize Twilio client
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

/**
 * Send a WhatsApp message via Twilio
 */
export async function sendWhatsAppMessage(
  phoneNumber: string,
  message: string,
  messageType: 'text' | 'template' = 'text'
) {
  try {
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
      throw new Error('Missing Twilio WhatsApp credentials');
    }

    // Format phone number with country code if needed
    const formattedPhone = phoneNumber.startsWith('+') 
      ? phoneNumber 
      : `+91${phoneNumber}`;

    const response = await twilioClient.messages.create({
      from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${formattedPhone}`,
      body: message,
    });

    return {
      sid: response.sid,
      status: response.status,
      to: response.to,
    };
  } catch (error) {
    console.error('WhatsApp send error:', error);
    throw error;
  }
}

/**
 * Send lead qualification message
 */
export async function sendLeadQualificationMessage(
  phoneNumber: string,
  leadName: string
) {
  const message = `Hi ${leadName}! 👋\n\nThanks for your interest! I'd like to understand your requirements better.\n\nCould you please share:\n1. What are you looking for?\n2. What's your budget?\n3. Timeline?\n\nLooking forward to helping you! 🚀`;

  return sendWhatsAppMessage(phoneNumber, message, 'text');
}

/**
 * Parse incoming WhatsApp message
 */
export function parseWhatsAppWebhook(body: any) {
  try {
    const message = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    const contact = body.entry?.[0]?.changes?.[0]?.value?.contacts?.[0];

    if (!message || !contact) {
      return null;
    }

    return {
      messageId: message.id,
      phoneNumber: message.from,
      timestamp: message.timestamp,
      type: message.type,
      text: message.text?.body || null,
      contactName: contact.profile?.name || null,
      contactPhone: contact.wa_id,
    };
  } catch (error) {
    console.error('Parse webhook error:', error);
    return null;
  }
}

/**
 * Verify WhatsApp webhook token
 */
export function verifyWebhookToken(
  token: string,
  challenge: string,
  verifyToken: string
): string | null {
  if (token === verifyToken) {
    return challenge;
  }
  return null;
}
