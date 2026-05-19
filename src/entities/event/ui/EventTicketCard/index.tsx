'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';

import { getEventImageSrc } from '@/entities/event/lib/getEventImageSrc';
import { EventTicket } from '@/entities/event/model/registrationTypes';
import { EventFormat } from '@/entities/event/model/types';
import EventInfoList from '@/entities/event/ui/EventInfoList';
import { formatEventDetailsDate } from '@/shared/lib';
import { assets } from '@/shared/model/assets';
import Button from '@/shared/ui/Button';
import ConfirmModal from '@/shared/ui/ConfirmModal';
import { CalendarIcon, LocationIcon, TicketIcon } from '@/shared/ui/Icons';

import * as S from './styled';

interface EventTicketCardProps {
  ticket: EventTicket;
  isCancelLoading?: boolean;
  onShareClick: (ticket: EventTicket) => void | Promise<void>;
  onOpenOnlineClick: (ticket: EventTicket) => void;
  onDownloadClick: (ticket: EventTicket) => void;
  onCancelClick: (ticket: EventTicket) => void | Promise<void>;
}

export default function EventTicketCard({
  ticket,
  isCancelLoading = false,
  onShareClick,
  onOpenOnlineClick,
  onDownloadClick,
  onCancelClick,
}: EventTicketCardProps): ReactNode {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const imageSrc =
    getEventImageSrc(ticket.image_url) ?? assets.events.eventFallback;

  const isOnline = ticket.format === EventFormat.ONLINE;

  const contactHref = `mailto:${ticket.organizer_email}?subject=${encodeURIComponent(
    `Вопрос по мероприятию «${ticket.title}»`,
  )}`;

  const handleCancelModalClose = (): void => {
    if (isCancelLoading) {
      return;
    }

    setIsCancelModalOpen(false);
  };

  const handleCancelConfirm = async (): Promise<void> => {
    await onCancelClick(ticket);
    setIsCancelModalOpen(false);
  };

  return (
    <>
      <S.Card>
        <S.ImageWrapper>
          <Image fill src={imageSrc} alt={ticket.title} sizes="100%" />
        </S.ImageWrapper>

        <S.Content>
          <S.CardInfo>
            <S.Title title={ticket.title}>{ticket.title}</S.Title>

            <EventInfoList
              items={[
                {
                  key: 'date',
                  icon: <CalendarIcon />,
                  text: formatEventDetailsDate(ticket.starts_at),
                },
                {
                  key: 'location',
                  icon: <LocationIcon />,
                  text: ticket.location,
                },
                {
                  key: 'price',
                  text: 'Бесплатное',
                },
                {
                  key: 'count',
                  text: `Количество мест: ${ticket.tickets_count}`,
                },
              ]}
            />
          </S.CardInfo>

          <S.HeaderActions
            showFavorite={false}
            onShareClick={() => onShareClick(ticket)}
          />
        </S.Content>

        <S.Actions>
          {isOnline ? (
            <Button
              fullWidth
              colorScheme="accent"
              size="lg"
              disabled={!ticket.online_url}
              onClick={() => onOpenOnlineClick(ticket)}
            >
              Открыть ссылку
            </Button>
          ) : (
            <Button
              fullWidth
              colorScheme="accent"
              size="lg"
              onClick={() => onDownloadClick(ticket)}
            >
              Скачать билет
            </Button>
          )}

          <Button
            fullWidth
            colorScheme="danger"
            size="lg"
            disabled={isCancelLoading}
            onClick={() => setIsCancelModalOpen(true)}
          >
            {isCancelLoading ? 'Отмена...' : 'Отменить заявку'}
          </Button>

          <S.ContactLink href={contactHref}>
            Связаться с организатором
          </S.ContactLink>
        </S.Actions>
      </S.Card>

      <ConfirmModal
        isOpen={isCancelModalOpen}
        title="Отменить заявку?"
        icon={<TicketIcon />}
        description={`Вы действительно хотите отменить заявку на мероприятие «${ticket.title}»?`}
        confirmText="Отменить заявку"
        cancelText="Вернуться"
        confirmColorScheme="danger"
        isLoading={isCancelLoading}
        onClose={handleCancelModalClose}
        onConfirm={handleCancelConfirm}
      />
    </>
  );
}
