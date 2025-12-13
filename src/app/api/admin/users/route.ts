import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getCurrentSession } from '@/lib/auth';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
    try {
        // 1. Security Check
        const session = await getCurrentSession();
        if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
        const userEmail = session.user.email;
        if (!userEmail || !adminEmails.includes(userEmail)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 2. Fetch Users from public.users table (contains profile data)
        const { data: profileUsers, error: profileError } = await supabaseAdmin
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (profileError) {
            console.error('Profile fetch error:', profileError);
        }

        // 3. Fetch auth users for last sign in time
        const { data: { users: authUsers }, error: authError } = await supabaseAdmin.auth.admin.listUsers();

        if (authError) {
            console.error('Auth fetch error:', authError);
        }

        // 4. Merge the data - profile data with last_sign_in from auth
        const authMap = new Map(authUsers?.map(u => [u.id, u]) || []);

        const mergedUsers = (profileUsers || []).map(profile => {
            const authUser = authMap.get(profile.id);
            return {
                id: profile.id,
                email: profile.email,
                subscription_plan: profile.subscription_plan || 'starter',
                monthly_lead_limit: profile.monthly_lead_limit || 100,
                leads_used: profile.leads_used || 0,
                created_at: profile.created_at,
                updated_at: profile.updated_at,
                last_sign_in_at: authUser?.last_sign_in_at,
            };
        });

        return NextResponse.json({ users: mergedUsers });

    } catch (error) {
        console.error('Admin Users API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
