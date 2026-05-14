import { UserRole } from '@/entities/user/model/types';
import { getRoleHomeRoute, isRoleAllowedForPath } from '@/shared/model/routes';

function getSafeCallbackUrl(callbackUrl: string | null): string | null {
  if (!callbackUrl) {
    return null;
  }

  if (!callbackUrl.startsWith('/') || callbackUrl.startsWith('//')) {
    return null;
  }

  return callbackUrl;
}

export function getRedirectAfterLogin(
  role: UserRole,
  callbackUrl: string | null,
): string {
  const safeCallbackUrl = getSafeCallbackUrl(callbackUrl);

  if (!safeCallbackUrl) {
    return getRoleHomeRoute(role);
  }

  if (!isRoleAllowedForPath(safeCallbackUrl, role)) {
    return getRoleHomeRoute(role);
  }

  return safeCallbackUrl;
}
