import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
);

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

function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { phoneNumber } = await request.json();

        if (!phoneNumber) {
            return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
        }

        // Format phone number (add + if not present, assume India if no country code)
        let formattedPhone = phoneNumber.replace(/\s+/g, '');
        if (!formattedPhone.startsWith('+')) {
            formattedPhone = formattedPhone.startsWith('91')
                ? `+${formattedPhone}`
                : `+91${formattedPhone}`;
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Store OTP and phone in user_integrations (upsert)
        const { error: dbError } = await supabase
            .from('user_integrations')
            .upsert({
                user_id: user.id,
                platform: 'whatsapp',
                api_key: formattedPhone,
                status: 'pending_verification',
                otp_code: otp,
                otp_expires_at: expiresAt.toISOString(),
            }, { onConflict: 'user_id,platform' });

        if (dbError) {
            console.error('OTP storage error:', dbError);
            return NextResponse.json({ error: 'Failed to store OTP' }, { status: 500 });
        }

        // Send WhatsApp message via Twilio
        try {
            await twilioClient.messages.create({
                from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
                to: `whatsapp:${formattedPhone}`,
                body: `Your LeadFilter verification code is: ${otp}\n\nThis code expires in 5 minutes. Do not share this code with anyone.`,
            });
        } catch (twilioError: any) {
            console.error('Twilio error:', twilioError);
            return NextResponse.json({
                error: `Failed to send WhatsApp message: ${twilioError.message || 'Unknown error'}`
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'OTP sent to your WhatsApp',
            phoneNumber: formattedPhone,
        });

    } catch (error) {
        console.error('Send OTP error:', error);
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Failed to send OTP'
        }, { status: 500 });
    }
}
