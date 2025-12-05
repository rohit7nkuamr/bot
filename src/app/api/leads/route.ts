import { NextRequest, NextResponse } from 'next/server';

/**
 * Leads API Routes
 * GET: Fetch user's leads
 * POST: Create a new lead
 */

export async function GET(request: NextRequest) {
  try {
    // TODO: Implement authentication middleware
    // const userId = await verifyAuth(request);

    // TODO: Fetch leads from Supabase
    // const { data: leads, error } = await supabase
    //   .from('leads')
    //   .select('*')
    //   .eq('user_id', userId)
    //   .order('created_at', { ascending: false });

    const leads = [
      {
        id: '1',
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        status: 'qualified',
        budget: 50000,
        created_at: new Date().toISOString(),
      },
    ];

    return NextResponse.json({ success: true, data: leads }, { status: 200 });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, name, budget } = body;

    // TODO: Implement authentication
    // TODO: Validate input
    // TODO: Check lead limit for subscription plan
    // TODO: Store in Supabase
    // TODO: Send WhatsApp qualification message

    return NextResponse.json(
      {
        success: true,
        message: 'Lead created successfully',
        data: { phone, name, budget },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
