import { NextRequest, NextResponse } from 'next/server';
import { getUserLeads, createLead, getLeadStats } from '@/lib/leads';
import { getCurrentSession, hasReachedLeadLimit, incrementLeadsUsed } from '@/lib/auth';

/**
 * Leads API Routes
 * GET: Fetch user's leads
 * POST: Create a new lead
 */

export async function GET(request: NextRequest) {
  try {
    // Get current user session
    const session = await getCurrentSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    let leads;
    if (status) {
      // Get leads by status
      const { getLeadsByStatus } = await import('@/lib/leads');
      leads = await getLeadsByStatus(userId, status as any);
    } else {
      // Get all leads
      leads = await getUserLeads(userId);
    }

    // Get stats
    const stats = await getLeadStats(userId);

    return NextResponse.json(
      {
        success: true,
        data: leads,
        stats,
      },
      { status: 200 }
    );
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
    // Get current user session
    const session = await getCurrentSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();
    const { phone, name, budget, raw_data } = body;

    // Validate input
    if (!phone || !name) {
      return NextResponse.json(
        { error: 'Phone and name are required' },
        { status: 400 }
      );
    }

    // Check if user has reached their lead limit
    const limitReached = await hasReachedLeadLimit(userId);
    if (limitReached) {
      return NextResponse.json(
        { error: 'You have reached your monthly lead limit. Please upgrade your plan.' },
        { status: 429 }
      );
    }

    // Create lead
    const lead = await createLead(userId, {
      phone,
      name,
      budget,
      raw_data,
    });

    // Increment user's lead count
    await incrementLeadsUsed(userId);

    return NextResponse.json(
      {
        success: true,
        message: 'Lead created successfully',
        data: lead,
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
