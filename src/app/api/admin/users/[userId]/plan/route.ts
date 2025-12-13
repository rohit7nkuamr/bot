import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getCurrentSession } from '@/lib/auth';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;

    try {
        const session = await getCurrentSession();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if requester is admin
        const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
        if (!adminEmails.includes(session.user.email)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { plan } = await request.json();

        // Validate plan
        const validPlans = ['starter', 'professional', 'enterprise'];
        if (!validPlans.includes(plan)) {
            return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
        }

        // Update user plan
        const planLimits = {
            starter: 100,
            professional: 1000,
            enterprise: 999999,
        };

        const { error } = await supabase
            .from('users')
            .update({
                subscription_plan: plan,
                monthly_lead_limit: planLimits[plan as keyof typeof planLimits],
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Update plan error:', error);
        return NextResponse.json(
            { error: 'Failed to update plan' },
            { status: 500 }
        );
    }
}
