import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
// import { verifyIndiamartKey } from '@/lib/indiamart'; // TODO: Add verification logic

export async function POST(request: Request) {
  try {
    const session = await getCurrentSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key is required' }, { status: 400 });
    }

    // TODO: Verify key validity by making a test request to Indiamart

    // Upsert integration
    const { error } = await supabase
      .from('user_integrations')
      .upsert({
        user_id: session.user.id,
        platform: 'indiamart',
        api_key: apiKey,
        status: 'connected',
        connected_at: new Date().toISOString(),
      }, { onConflict: 'user_id, platform' });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('IndiaMART Connect Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
