import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIES_ACCESS_TOKEN_ADMIN } from './actions/actionTypes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';

  const isAdminRoute = pathname.startsWith('/admin');
  const token = request.cookies.get(COOKIES_ACCESS_TOKEN_ADMIN)?.value; // replace with your token name

  // Redirect unauthenticated admin users
  if (isAdminRoute && !token && pathname !== '/admin/signin') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/signin';
    return NextResponse.redirect(url);
  }

  // ✅ If already authenticated and trying to access /admin/signin → redirect to /admin/dashboard
  // if (token && pathname?.startsWith(`/admin/`)) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/admin/dashboard';
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}
