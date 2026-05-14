import { NextRequest, NextResponse } from 'next/server';

import {
  authRoutes,
  getRoleHomeRoute,
  isPathStartsWith,
  isRoleAllowedForPath,
  protectedRoutes,
  routes,
} from '@/shared/model/routes';

import { UserRole, UserStatus } from './entities/user/model/types';

interface CurrentUser {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
}

interface GetMeResponse {
  success: true;
  message: string;
  data: {
    user: CurrentUser;
  };
}

async function getCurrentUser(
  request: NextRequest,
): Promise<CurrentUser | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const authCookieName = process.env.AUTH_COOKIE_NAME;

  if (!apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  if (!authCookieName) {
    throw new Error('AUTH_COOKIE_NAME is not defined');
  }

  const token = request.cookies.get(authCookieName)?.value;

  if (!token) {
    return null;
  }

  const cookieHeader = request.headers.get('cookie');

  if (!cookieHeader) {
    return null;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      method: 'GET',
      headers: {
        cookie: cookieHeader,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as GetMeResponse;

    return result.data.user;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const isAuthRoute = isPathStartsWith(pathname, authRoutes);
  const isProtectedRoute = isPathStartsWith(pathname, protectedRoutes);

  if (!isAuthRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  const currentUser = await getCurrentUser(request);

  if (!currentUser) {
    if (isProtectedRoute) {
      const signInUrl = new URL(routes.auth.signIn, request.url);

      signInUrl.searchParams.set('callbackUrl', pathname);

      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  }

  if (currentUser.status !== UserStatus.ACTIVE) {
    return NextResponse.redirect(new URL(routes.auth.signIn, request.url));
  }

  if (isAuthRoute) {
    return NextResponse.redirect(
      new URL(getRoleHomeRoute(currentUser.role), request.url),
    );
  }

  if (!isRoleAllowedForPath(pathname, currentUser.role)) {
    return NextResponse.redirect(
      new URL(getRoleHomeRoute(currentUser.role), request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.ico|apple-icon.png|manifest.json|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg)$).*)',
  ],
};
