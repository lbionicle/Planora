import { assets } from '@/shared/model/assets';

const staticBaseUrl = process.env.NEXT_PUBLIC_STATIC_URL;

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function getUserAvatarSrc(avatarUrl?: string | null): string {
  if (!avatarUrl) {
    return assets.avatars.userFallback;
  }

  if (avatarUrl.startsWith('http')) {
    return avatarUrl;
  }

  if (!staticBaseUrl) {
    return assets.avatars.userFallback;
  }

  return joinUrl(staticBaseUrl, avatarUrl);
}
