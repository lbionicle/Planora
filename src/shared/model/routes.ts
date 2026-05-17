import { UserRole } from '@/entities/user/model/types';

export const routes = {
  home: '/',

  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
  },

  public: {
    events: '/events',
    eventDetails: (eventId: string) => `/events/${eventId}`,
    privacy: '/privacy',
  },

  participant: {
    root: '/participant',
    favorites: '/participant/favorites',
    tickets: '/participant/tickets',
  },

  organizer: {
    root: '/organizer',
    events: '/organizer/events',
    createEvent: '/organizer/events/create',
    invitations: '/organizer/invitations',
    analytics: '/organizer/analytics',
  },

  admin: {
    root: '/admin',
    requests: '/admin/requests',
    users: '/admin/users',
    analytics: '/admin/analytics',
  },
} as const;

export const roleHomeRoutes: Record<UserRole, string> = {
  [UserRole.PARTICIPANT]: routes.participant.root,
  [UserRole.ORGANIZER]: routes.organizer.root,
  [UserRole.ADMIN]: routes.admin.requests,
};

export const authRoutes = [routes.auth.signIn, routes.auth.signUp] as const;

export const participantRoutes = [routes.participant.root] as const;

export const organizerRoutes = [routes.organizer.root] as const;

export const adminRoutes = [routes.admin.root] as const;

export const protectedRoutes = [
  ...participantRoutes,
  ...organizerRoutes,
  ...adminRoutes,
] as const;

export function isPathStartsWith(
  pathname: string,
  routeList: readonly string[],
): boolean {
  return routeList.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function getRoleHomeRoute(role: UserRole): string {
  return roleHomeRoutes[role] ?? routes.home;
}

export function isRoleAllowedForPath(
  pathname: string,
  role: UserRole,
): boolean {
  if (isPathStartsWith(pathname, participantRoutes)) {
    return role === UserRole.PARTICIPANT;
  }

  if (isPathStartsWith(pathname, organizerRoutes)) {
    return role === UserRole.ORGANIZER;
  }

  if (isPathStartsWith(pathname, adminRoutes)) {
    return role === UserRole.ADMIN;
  }

  return true;
}
