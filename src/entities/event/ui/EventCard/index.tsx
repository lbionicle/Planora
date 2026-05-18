'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

import { getEventImageSrc } from '@/entities/event/lib/getEventImageSrc';
import { EventListItem } from '@/entities/event/model/types';
import { assets } from '@/shared/model/assets';
import { routes } from '@/shared/model/routes';
import { CalendarIcon, LocationIcon } from '@/shared/ui/Icons';

import { formatEventCardDate } from '../../lib';
import EventCardActions from '../EventCardActions';
import * as S from './styled';

interface EventCardProps {
  event: EventListItem;
  isFavorite?: boolean;
  showFavorite?: boolean;
  onFavoriteClick?: () => void;
  onShareClick?: () => void;
}

export default function EventCard({
  event,
  isFavorite = false,
  showFavorite = false,
  onFavoriteClick,
  onShareClick,
}: EventCardProps): ReactNode {
  const imageSrc =
    getEventImageSrc(event.image_url) ?? assets.events.eventFallback;

  const eventHref = routes.public.eventDetails(event.public_id);

  return (
    <S.Card>
      <S.CardLink
        href={eventHref}
        aria-label={`Открыть мероприятие ${event.title}`}
      />
      <S.ImageWrapper>
        <Image fill src={imageSrc} alt={event.title} sizes="100%" />
      </S.ImageWrapper>

      <S.Content>
        <S.Title>{event.title}</S.Title>

        <S.InfoList>
          <S.InfoItem>
            <S.InfoItemIcon>
              <CalendarIcon />
            </S.InfoItemIcon>
            {formatEventCardDate(event.starts_at)}
          </S.InfoItem>
          <S.InfoItem>
            <S.InfoItemIcon>
              <LocationIcon />
            </S.InfoItemIcon>
            {event.location}
          </S.InfoItem>
          <S.InfoItem>{event.is_free ? 'Бесплатное' : 'Платное'}</S.InfoItem>
        </S.InfoList>
      </S.Content>

      <EventCardActions
        showFavorite={showFavorite}
        isFavorite={isFavorite}
        onFavoriteClick={onFavoriteClick}
        onShareClick={onShareClick}
      />
    </S.Card>
  );
}
