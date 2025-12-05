import { NextRequest, NextResponse } from 'next/server';

/**
 * WhatsApp Webhook Handler
 * Receives messages from Meta Cloud API and processes them
 */

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify webhook token
  if (mode === 'subscribe' && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
    console.log('✓ Webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Unauthorized', { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle incoming WhatsApp messages
    if (body.object === 'whatsapp_business_account') {
      const entries = body.entry || [];

      for (const entry of entries) {
        const changes = entry.changes || [];

        for (const change of changes) {
          if (change.field === 'messages') {
            const messages = change.value.messages || [];

            for (const message of messages) {
              await handleIncomingMessage(message);
            }
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleIncomingMessage(message: any) {
  const phoneNumber = message.from;
  const messageId = message.id;
  const timestamp = message.timestamp;

  console.log(`📱 Message from ${phoneNumber}: ${JSON.stringify(message)}`);

  // TODO: Implement message processing logic
  // 1. Extract lead information
  // 2. Store in Supabase
  // 3. Send qualification questions
  // 4. Process responses with GPT-4o-mini
  // 5. Forward qualified leads to business owner
}
