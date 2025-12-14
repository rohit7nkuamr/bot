import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function getUserFromRequest(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.split(' ')[1];
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return null;
    return user;
}

export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { otp } = await request.json();

        if (!otp) {
            return NextResponse.json({ error: 'OTP is required' }, { status: 400 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Get stored OTP
        const { data: integration, error: fetchError } = await supabase
            .from('user_integrations')
            .select('*')
            .eq('user_id', user.id)
            .eq('platform', 'whatsapp')
            .single();

        if (fetchError || !integration) {
            return NextResponse.json({ error: 'No pending verification found' }, { status: 400 });
        }

        // Check if OTP matches
        if (integration.otp_code !== otp) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }

        // Check if OTP expired
        if (new Date(integration.otp_expires_at) < new Date()) {
            return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
        }

        // Update status to connected
        const { error: updateError } = await supabase
            .from('user_integrations')
            .update({
                status: 'connected',
                otp_code: null,
                otp_expires_at: null,
                connected_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)
            .eq('platform', 'whatsapp');

        if (updateError) {
            console.error('Update error:', updateError);
            return NextResponse.json({ error: 'Failed to verify' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'WhatsApp verified successfully!',
            phoneNumber: integration.api_key,
        });

    } catch (error) {
        console.error('Verify OTP error:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Verification failed'
        }, { status: 500 });
    }
}
