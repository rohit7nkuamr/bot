import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getCurrentSession } from '@/lib/auth';

// User Client (uses RLS) matches authentication of the request
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const session = await getCurrentSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { apiKey } = await request.json(); // "apiKey" here is actually Phone Number for WhatsApp Managed

        if (!apiKey) {
            return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
        }

        // Upsert integration
        const { error } = await supabase
            .from('user_integrations')
            .upsert({
                user_id: session.user.id,
                platform: 'whatsapp',
                api_key: apiKey, // Storing phone number in api_key column to avoid schema change
                status: 'connected',
                connected_at: new Date().toISOString(),
            }, { onConflict: 'user_id, platform' });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('WhatsApp Connect Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
