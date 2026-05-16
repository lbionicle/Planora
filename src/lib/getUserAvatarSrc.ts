import { assets } from '@/shared/model';

export function getUserAvatarSrc(avatarUrl?: string | null): string {
  return avatarUrl || assets.avatars.userFallback;
}
