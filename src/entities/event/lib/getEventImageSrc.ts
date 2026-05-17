import { joinUrl } from '@/shared/lib';
import { assets } from '@/shared/model/assets';

const staticBaseUrl = process.env.NEXT_PUBLIC_STATIC_URL;

export function getEventImageSrc(imageUrl?: string | null): string {
  if (!imageUrl) {
    return assets.events.eventFallback;
  }

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  if (!staticBaseUrl) {
    return assets.events.eventFallback;
  }

  return joinUrl(staticBaseUrl, imageUrl);
}
