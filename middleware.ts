import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect hidden admin route /06620676830610209229/*
  if (pathname.startsWith('/06620676830610209229')) {
    // Allow login page without authentication
    if (pathname === '/06620676830610209229/login') {
      console.log('[MIDDLEWARE] Allowing unauthenticated access to login page');
      return NextResponse.next();
    }

    // Check for admin token on all other admin routes
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      console.log('[MIDDLEWARE] No token found, blocking access to:', pathname);
      // For hidden admin routes, return 404 to avoid hinting existence
      return new NextResponse('Not Found', { status: 404 });
    }

    console.log('[MIDDLEWARE] Token found, allowing access to:', pathname);
    return NextResponse.next();
  }

  // Protect /admin routes (existing admin panel)
  if (pathname.startsWith('/admin')) {
    // Allow /admin/login without authentication
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for admin token
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/06620676830610209229/:path*'],
};
