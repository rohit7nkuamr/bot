// Meta WhatsApp Cloud API Integration

const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_API_VERSION = 'v18.0';

interface WhatsAppMessageResponse {
  messaging_product: string;
  contacts: { input: string; wa_id: string }[];
  messages: { id: string }[];
}

/**
 * Send a WhatsApp message using Meta Cloud API
 */
export async function sendWhatsAppMessage(to: string, body: string) {
  try {
    // Clean phone number - remove any whatsapp: prefix and non-digits except +
    let phoneNumber = to.replace('whatsapp:', '').trim();

    // Ensure it starts with country code (default to India if not)
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.startsWith('91') ? `+${phoneNumber}` : `+91${phoneNumber}`;
    }

    // Remove the + for API call
    const cleanNumber = phoneNumber.replace('+', '');

    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error('WhatsApp API credentials not configured');
      return { success: false, error: 'WhatsApp API not configured' };
    }

    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanNumber,
        type: 'text',
        text: {
          preview_url: false,
          body: body,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('WhatsApp API Error:', data);
      return { success: false, error: data.error?.message || 'Failed to send message' };
    }

    console.log(`WhatsApp message sent to ${cleanNumber}:`, data.messages?.[0]?.id);
    return { success: true, messageId: data.messages?.[0]?.id };

  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send a WhatsApp template message (for messages outside 24hr window)
 */
export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  languageCode: string = 'en',
  components?: any[]
) {
  try {
    let phoneNumber = to.replace('whatsapp:', '').trim();
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = phoneNumber.startsWith('91') ? `+${phoneNumber}` : `+91${phoneNumber}`;
    }
    const cleanNumber = phoneNumber.replace('+', '');

    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      console.error('WhatsApp API credentials not configured');
      return { success: false, error: 'WhatsApp API not configured' };
    }

    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const payload: any = {
      messaging_product: 'whatsapp',
      to: cleanNumber,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: languageCode,
        },
      },
    };

    if (components) {
      payload.template.components = components;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('WhatsApp Template API Error:', data);
      return { success: false, error: data.error?.message || 'Failed to send template' };
    }

    console.log(`WhatsApp template sent to ${cleanNumber}:`, data.messages?.[0]?.id);
    return { success: true, messageId: data.messages?.[0]?.id };

  } catch (error) {
    console.error('Failed to send WhatsApp template:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Mark a message as read
 */
export async function markMessageAsRead(messageId: string) {
  try {
    if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
      return { success: false, error: 'WhatsApp API not configured' };
    }

    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId,
      }),
    });

    return { success: response.ok };
  } catch (error) {
    console.error('Failed to mark message as read:', error);
    return { success: false, error: String(error) };
  }
}
