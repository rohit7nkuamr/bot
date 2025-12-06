import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabase';

// A placeholder for a real encryption library
const encrypt = (text: string) => `encrypted_${text}`;

export async function POST(request: NextRequest) {
  try {
    const session = await getCurrentSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { apiKey } = await request.json();
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key is required' }, { status: 400 });
    }

    // TODO: Validate the API key with HubSpot here

    const encryptedKey = encrypt(apiKey);

    const { error } = await supabaseServer
      .from('users')
      .update({ hubspot_api_key: encryptedKey })
      .eq('id', session.user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, message: 'HubSpot connected successfully' });

  } catch (error) {
    console.error('HubSpot connection error:', error);
    return NextResponse.json({ error: 'Failed to connect to HubSpot' }, { status: 500 });
  }
}
