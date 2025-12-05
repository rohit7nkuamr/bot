import axios from 'axios';

const WHATSAPP_API_URL = 'https://graph.instagram.com/v18.0';
const BUSINESS_ACCOUNT_ID = process.env.NEXT_PUBLIC_META_BUSINESS_ACCOUNT_ID;
const WHATSAPP_API_TOKEN = process.env.META_WHATSAPP_API_TOKEN;

/**
 * Send a WhatsApp message
 */
export async function sendWhatsAppMessage(
  phoneNumber: string,
  message: string,
  messageType: 'text' | 'template' = 'text'
) {
  try {
    if (!BUSINESS_ACCOUNT_ID || !WHATSAPP_API_TOKEN) {
      throw new Error('Missing WhatsApp API credentials');
    }

    const url = `${WHATSAPP_API_URL}/${BUSINESS_ACCOUNT_ID}/messages`;

    const payload =
      messageType === 'template'
        ? {
            messaging_product: 'whatsapp',
            to: phoneNumber,
            type: 'template',
            template: {
              name: 'lead_qualification',
              language: {
                code: 'en_US',
              },
            },
          }
        : {
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: phoneNumber,
            type: 'text',
            text: {
              body: message,
            },
          };

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
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
