import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Helper to get user from Authorization header
 */
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

/**
 * GET - Fetch user's integrations status
 */
export async function GET(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        const { data: integrations, error } = await supabase
            .from('user_integrations')
            .select('*')
            .eq('user_id', user.id);

        if (error) throw error;

        // Transform to a more useful format
        const status = {
            whatsapp: { connected: false, connectedAs: null },
            indiamart: { connected: false, connectedAs: null },
            zoho: { connected: false, connectedAs: null },
        };

        integrations?.forEach((integration: any) => {
            if (integration.platform in status) {
                status[integration.platform as keyof typeof status] = {
                    connected: integration.status === 'connected',
                    connectedAs: integration.api_key ?
                        (integration.platform === 'whatsapp' ? integration.api_key : 'API Key configured')
                        : null,
                };
            }
        });

        return NextResponse.json({ success: true, data: status });
    } catch (error) {
        console.error('Fetch integrations error:', error);
        return NextResponse.json({ error: 'Failed to fetch integrations' }, { status: 500 });
    }
}

/**
 * POST - Connect an integration
 */
export async function POST(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { platform, apiKey } = await request.json();

        if (!platform || !apiKey) {
            return NextResponse.json({ error: 'Platform and API key are required' }, { status: 400 });
        }

        if (!['whatsapp', 'indiamart', 'zoho'].includes(platform)) {
            return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Upsert integration
        const { error } = await supabase
            .from('user_integrations')
            .upsert({
                user_id: user.id,
                platform,
                api_key: apiKey,
                status: 'connected',
                connected_at: new Date().toISOString(),
            }, { onConflict: 'user_id,platform' });

        if (error) throw error;

        return NextResponse.json({ success: true, message: `${platform} connected successfully` });
    } catch (error) {
        console.error('Connect integration error:', error);
        return NextResponse.json({ error: 'Failed to connect integration' }, { status: 500 });
    }
}

/**
 * DELETE - Disconnect an integration
 */
export async function DELETE(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { platform } = await request.json();

        if (!platform) {
            return NextResponse.json({ error: 'Platform is required' }, { status: 400 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        const { error } = await supabase
            .from('user_integrations')
            .delete()
            .eq('user_id', user.id)
            .eq('platform', platform);

        if (error) throw error;

        return NextResponse.json({ success: true, message: `${platform} disconnected` });
    } catch (error) {
        console.error('Disconnect integration error:', error);
        return NextResponse.json({ error: 'Failed to disconnect' }, { status: 500 });
    }
}
