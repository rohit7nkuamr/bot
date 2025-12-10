import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { fetchIndiamartLeads } from '@/lib/indiamart';
import { qualifyLead } from '@/lib/ai';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

// Separate Supabase client for Cron (Service Role) to access all users' data
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
    try {
        // Security Check: Verify Cron Secret (optional but recommended)
        // const authHeader = request.headers.get('authorization');
        // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        // }

        // 1. Get all users with an Indiamart API Key
        const { data: users, error: userError } = await supabaseAdmin
            .from('user_integrations') // You need this table
            .select('user_id, api_key')
            .eq('platform', 'indiamart')
            .eq('status', 'connected');

        if (userError) throw userError;

        if (!users || users.length === 0) {
            return NextResponse.json({ message: 'No connected users found' });
        }

        const results = [];

        // 2. Iterate and Fetch
        for (const integration of users) {
            const leads = await fetchIndiamartLeads(integration.api_key);

            if (leads.length === 0) continue;

            let newLeadsCount = 0;

            for (const lead of leads) {
                // 3. Deduplicate
                const { data: existing } = await supabaseAdmin
                    .from('leads')
                    .select('id')
                    .eq('external_id', lead.UNIQUE_QUERY_ID)
                    .single();

                if (!existing) {
                    // 4. Insert New Lead
                    await supabaseAdmin.from('leads').insert({
                        user_id: integration.user_id,
                        external_id: lead.UNIQUE_QUERY_ID,
                        name: lead.SENDER_NAME,
                        phone: lead.SENDER_MOBILE,
                        email: lead.SENDER_EMAIL,
                        source: 'IndiaMART',
                        status: 'new', // Ready for AI pickup
                        raw_data: lead,
                    });
                    newLeadsCount++;

                    // TODO: Trigger AI Webhook or Queue here immediately
                }
            }
            results.push({ userId: integration.user_id, fetched: leads.length, new: newLeadsCount });
        }

        return NextResponse.json({ success: true, results });

    } catch (error) {
        console.error('Cron Job Failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
