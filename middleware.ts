import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protect main authenticated routes by checking for an auth cookie (token/jwt).
// This is a minimal example — adapt cookie names and validation to your auth.
export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken')?.value || req.cookies.get('token')?.value || req.cookies.get('jwt')?.value;

  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.search = `redirectTo=${encodeURIComponent(req.nextUrl.pathname)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/challenges/:path*',
    // '/events/:path*',
    // '/learning/:path*',
    // '/rooms/:path*',
    // '/host/:path*',
  ],
};
