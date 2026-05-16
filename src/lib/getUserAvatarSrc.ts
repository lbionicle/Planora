import { assets } from '@/shared/model';

export function getUserAvatarSrc(avatarUrl?: string | null): string {
  if (!avatarUrl) {
    return assets.avatars.userFallback;
  }

  if (avatarUrl.startsWith('http')) {
    return avatarUrl;
  }

  return `${process.env.NEXT_PUBLIC_API_URL}${avatarUrl}`;
}
