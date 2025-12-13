import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const token_hash = requestUrl.searchParams.get('token_hash');
    const type = requestUrl.searchParams.get('type');
    const next = requestUrl.searchParams.get('next') || '/dashboard';

    // Create Supabase client
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            auth: {
                flowType: 'pkce',
            }
        }
    );

    try {
        // Handle PKCE code exchange
        if (code) {
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            if (!error) {
                return NextResponse.redirect(new URL(next, requestUrl.origin));
            }
            console.error('Code exchange error:', error);
        }

        // Handle token hash (magic link)
        if (token_hash && type) {
            const { error } = await supabase.auth.verifyOtp({
                token_hash,
                type: type as 'magiclink' | 'email',
            });
            if (!error) {
                return NextResponse.redirect(new URL(next, requestUrl.origin));
            }
            console.error('OTP verification error:', error);
        }

        // Check URL hash for access_token (client-side redirect case)
        // This handles the case where Supabase redirects with hash fragment
        // The actual token handling happens client-side

    } catch (error) {
        console.error('Auth callback error:', error);
    }

    // If we got here without success, redirect back with error
    return NextResponse.redirect(new URL(`/admin-login?error=auth_failed`, requestUrl.origin));
}
