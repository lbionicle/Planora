'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useGetParticipantEventRegistrationQuery } from '@/entities/event/api/participantRegistrationsApi';
import { useGetPublicEventQuery } from '@/entities/event/api/publicEventsApi';
import { getEventImageSrc } from '@/entities/event/lib';
import { useEventCardActions } from '@/entities/event/lib/useEventCardActions';
import { EventFormat } from '@/entities/event/model/types';
import EventCardActions from '@/entities/event/ui/EventCardActions';
import EventInfoList from '@/entities/event/ui/EventInfoList';
import { UserRole } from '@/entities/user/model/types';
import {
  selectCurrentUserRole,
  selectIsAuthInitialized,
} from '@/features/auth/model/selectors';
import { formatEventDetailsDate, useAppSelector } from '@/shared/lib';
import { assets } from '@/shared/model';
import { routes } from '@/shared/model/routes';
import { CalendarIcon, LocationIcon, OrganizerIcon } from '@/shared/ui/Icons';
import PageLayout from '@/shared/ui/PageLayout';

import { getEventMapUrl } from '../../lib';
import EventRegistrationModal from '../EventRegistrationModal';
import * as S from './styled';

interface EventDetailsPageProps {
  publicId: string;
}

export default function EventDetailsPage({
  publicId,
}: EventDetailsPageProps): ReactNode {
  const router = useRouter();

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const isAuthInitialized = useAppSelector(selectIsAuthInitialized);
  const currentUserRole = useAppSelector(selectCurrentUserRole);

  const { data, isLoading, isFetching } = useGetPublicEventQuery(publicId);

  const event = data?.data;

  const isParticipant = currentUserRole === UserRole.PARTICIPANT;
  const isGuest = isAuthInitialized && !currentUserRole;
  const canUseUserActions = isGuest || isParticipant;

  const {
    showFavorite,
    isEventFavorite,
    handleShareEvent,
    handleToggleFavoriteEvent,
  } = useEventCardActions();

  const { data: registrationData } = useGetParticipantEventRegistrationQuery(
    event?.id ?? '',
    {
      skip: !isParticipant || !event?.id,
    },
  );

  const registration = registrationData?.data.registration ?? null;

  if (isLoading || isFetching) {
    return <S.State>Загрузка мероприятия...</S.State>;
  }

  if (!event) {
    return <S.State>Мероприятие не найдено</S.State>;
  }

  const imageSrc = event.image_url ? getEventImageSrc(event.image_url) : null;

  const hasAvailableTickets = event.available_tickets_count > 0;
  const isAlreadyRegistered = Boolean(registration);
  const mapUrl = getEventMapUrl(event.location);

  const handleSignInClick = (): void => {
    const callbackUrl = routes.public.eventDetails(publicId);

    router.push(
      `${routes.auth.signIn}?callbackUrl=${encodeURIComponent(callbackUrl)}`,
    );
  };

  const handleRequestSeatClick = (): void => {
    if (isGuest) {
      handleSignInClick();
      return;
    }

    if (!isParticipant || isAlreadyRegistered || !hasAvailableTickets) {
      return;
    }

    setIsRegistrationModalOpen(true);
  };

  function getPrimaryButtonText(): string {
    if (isGuest) {
      return 'Войти';
    }

    if (isAlreadyRegistered) {
      return 'Билет оформлен';
    }

    if (!hasAvailableTickets) {
      return 'Мест нет';
    }

    return 'Запросить место';
  }

  const breadcrumbsItems = [
    { label: 'Главная', href: routes.home },
    { label: 'Мероприятия', href: routes.public.events },
    { label: event.title },
  ];

  return (
    <>
      <PageLayout breadcrumbs={breadcrumbsItems}>
        {imageSrc && (
          <S.Hero>
            <Image
              fill
              priority
              src={imageSrc}
              alt={event.title}
              sizes="100%"
            />
          </S.Hero>
        )}

        <S.Layout>
          <S.Main>
            <S.Title>{event.title}</S.Title>

            <EventInfoList
              items={[
                {
                  key: 'organizer',
                  icon: <OrganizerIcon />,
                  text: event.organizer_name,
                  title: event.organizer_name,
                },
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
              ]}
            />

            <S.Divider />

            <S.Section>
              <S.SectionTitle>Описание</S.SectionTitle>
              <S.Text>{event.description}</S.Text>
            </S.Section>

            <S.Divider />

            <>
              {event.format === EventFormat.ONLINE ? (
                <S.Section>
                  <S.SectionTitle>Местоположение</S.SectionTitle>
                  <S.Text>Онлайн-мероприятие</S.Text>
                </S.Section>
              ) : (
                <S.LocationLayout>
                  <S.Section>
                    <S.SectionTitle>Местоположение</S.SectionTitle>
                    <S.Text>{event.location}</S.Text>
                  </S.Section>

                  <S.MapPreviewLink
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image fill src={assets.map.mapStub} alt="" sizes="100%" />

                    <S.MapButton colorScheme="secondary">
                      Показать карту
                    </S.MapButton>
                  </S.MapPreviewLink>
                </S.LocationLayout>
              )}
            </>
          </S.Main>

          <S.Aside>
            <S.ActionCard>
              <S.ActionInfo>
                <S.Price>Бесплатное</S.Price>
                <S.ActionDate>
                  {formatEventDetailsDate(event.starts_at)}
                </S.ActionDate>

                {isParticipant && (
                  <S.PlacesText>
                    Осталось мест:{' '}
                    <S.PlacesNumber>
                      {event.available_tickets_count}
                    </S.PlacesNumber>
                  </S.PlacesText>
                )}
              </S.ActionInfo>

              {(isGuest || isParticipant) && (
                <S.ActionButton
                  disabled={
                    !isAuthInitialized ||
                    (isParticipant &&
                      (isAlreadyRegistered || !hasAvailableTickets))
                  }
                  onClick={handleRequestSeatClick}
                >
                  {getPrimaryButtonText()}
                </S.ActionButton>
              )}
            </S.ActionCard>

            {canUseUserActions && (
              <EventCardActions
                showFavorite={showFavorite}
                isFavorite={isEventFavorite(event.id)}
                onFavoriteClick={() => handleToggleFavoriteEvent(event.id)}
                onShareClick={() => handleShareEvent(event.public_id)}
              />
            )}
          </S.Aside>
        </S.Layout>
      </PageLayout>

      {isRegistrationModalOpen && (
        <EventRegistrationModal
          isOpen
          event={event}
          onClose={() => setIsRegistrationModalOpen(false)}
        />
      )}
    </>
  );
}
