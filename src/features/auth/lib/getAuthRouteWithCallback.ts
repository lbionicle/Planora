export function getAuthRouteWithCallback(
  route: string,
  callbackUrl?: string | null,
): string {
  if (!callbackUrl) {
    return route;
  }

  return `${route}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
}
