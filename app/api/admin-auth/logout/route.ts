import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
  try {
    // Clear admin token cookie
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );

    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Delete cookie
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[API] Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
