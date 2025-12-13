import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') || '/admin';

    if (code) {
        // Exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Successful auth - redirect to admin panel
            return NextResponse.redirect(new URL(next, requestUrl.origin));
        }
    }

    // Something went wrong, redirect to login with error
    return NextResponse.redirect(new URL('/admin-login?error=auth_failed', requestUrl.origin));
}
