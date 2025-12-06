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
      try {
        const result = await signUp(email, password);
        return NextResponse.json(
          {
            success: true,
            message: 'Signup successful',
            data: result.user,
          },
          { status: 201 }
        );
      } catch (signupError: any) {
        return NextResponse.json(
          { error: signupError?.message || 'Signup failed' },
          { status: 400 }
        );
      }
    }

    if (action === 'login') {
      try {
        const result = await signIn(email, password);
        return NextResponse.json(
          {
            success: true,
            message: 'Login successful',
            data: result.session,
          },
          { status: 200 }
        );
      } catch (loginError: any) {
        return NextResponse.json(
          { error: loginError?.message || 'Login failed' },
          { status: 401 }
        );
      }
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
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { 
        error: error?.message || 'Authentication failed',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
