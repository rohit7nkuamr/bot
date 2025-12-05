import { NextRequest, NextResponse } from 'next/server';
import { signUp, signIn, signOut, getCurrentUser } from '@/lib/auth';

/**
 * Authentication Routes
 * POST: Handle signup, login, logout, get-user
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password } = body;

    if (action === 'signup') {
      const result = await signUp(email, password);
      return NextResponse.json(
        {
          success: true,
          message: 'Signup successful',
          data: result.user,
        },
        { status: 201 }
      );
    }

    if (action === 'login') {
      const result = await signIn(email, password);
      return NextResponse.json(
        {
          success: true,
          message: 'Login successful',
          data: result.session,
        },
        { status: 200 }
      );
    }

    if (action === 'logout') {
      await signOut();
      return NextResponse.json(
        { success: true, message: 'Logout successful' },
        { status: 200 }
      );
    }

    if (action === 'get-user') {
      const user = await getCurrentUser();
      return NextResponse.json(
        {
          success: true,
          data: user,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
