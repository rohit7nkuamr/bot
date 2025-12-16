import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getPlanConfig } from '@/lib/planLimits';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        // Fetch user data with usage info
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('subscription_plan, leads_this_month, ai_conversations_this_month, usage_reset_date')
            .eq('id', user.id)
            .single();

        const plan = userData?.subscription_plan || 'starter';
        const config = getPlanConfig(plan);

        // Check if we need to reset monthly usage
        let leadsUsed = userData?.leads_this_month || 0;
        let aiConversationsUsed = userData?.ai_conversations_this_month || 0;
        let resetDate = userData?.usage_reset_date;

        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;

        if (!resetDate || new Date(resetDate) < new Date(currentMonth)) {
            // Reset usage for new month
            leadsUsed = 0;
            aiConversationsUsed = 0;
            resetDate = currentMonth;

            // Update in database
            await supabase
                .from('users')
                .update({
                    leads_this_month: 0,
                    ai_conversations_this_month: 0,
                    usage_reset_date: currentMonth,
                })
                .eq('id', user.id);
        }

        // Calculate next reset date (1st of next month)
        const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        return NextResponse.json({
            success: true,
            usage: {
                leadsUsed,
                leadsLimit: config.leads,
                aiConversationsUsed,
                aiConversationsLimit: config.aiConversations,
                plan,
                resetDate: nextMonth.toISOString(),
            },
        });

    } catch (error) {
        console.error('Usage API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST - Increment usage (called by other APIs)
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const body = await request.json();
        const { type } = body; // 'lead' or 'ai_conversation'

        if (type === 'lead') {
            await supabase.rpc('increment_leads', { user_id_param: user.id });
        } else if (type === 'ai_conversation') {
            await supabase.rpc('increment_ai_conversations', { user_id_param: user.id });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Usage increment error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
