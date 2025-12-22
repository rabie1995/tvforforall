import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow all routes - no authentication required
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
