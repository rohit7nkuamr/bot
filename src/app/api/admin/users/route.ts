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

        const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
        const userEmail = session.user.email;
        if (!userEmail || !adminEmails.includes(userEmail)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 2. Fetch Users
        // supbase-js auth admin API
        const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

        if (error) throw error;

        // 3. Fetch Extra Profile Data (Optional, if we have a profiles table)
        // const { data: profiles } = await supabaseAdmin.from('profiles').select('*');

        // Merge logic would go here. For now, return raw auth users.
        const mappedUsers = users.map(u => ({
            id: u.id,
            email: u.email,
            created_at: u.created_at,
            last_sign_in_at: u.last_sign_in_at,
            // Mock plan data for now as it's not in auth.users metadata by default usually
            plan: u.app_metadata?.plan || 'free',
            leads_used: 0 // Fetch from DB ideally
        }));

        return NextResponse.json({ users: mappedUsers });

    } catch (error) {
        console.error('Admin Users API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
