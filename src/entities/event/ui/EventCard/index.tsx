'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

import { getEventImageSrc } from '@/entities/event/lib/getEventImageSrc';
import { EventListItem } from '@/entities/event/model/types';
import { formatEventDetailsDate } from '@/shared/lib';
import { assets } from '@/shared/model/assets';
import { routes } from '@/shared/model/routes';
import { CalendarIcon, LocationIcon } from '@/shared/ui/Icons';

import EventCardActions from '../EventCardActions';
import EventInfoList from '../EventInfoList';
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

        <EventInfoList
          items={[
            {
              key: 'date',
              icon: <CalendarIcon />,
              text: formatEventDetailsDate(event.starts_at),
            },
            {
              key: 'location',
              icon: <LocationIcon />,
              text: event.location,
              title: event.location,
            },
            {
              key: 'price',
              text: event.is_free ? 'Бесплатное' : 'Платное',
            },
          ]}
        />
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
