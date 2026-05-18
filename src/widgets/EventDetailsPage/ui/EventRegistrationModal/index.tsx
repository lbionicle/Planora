'use client';

import { ReactNode, useState } from 'react';
import { toast } from 'sonner';

import { useCreateParticipantEventRegistrationMutation } from '@/entities/event/api/participantRegistrationsApi';
import { EventDetail } from '@/entities/event/model/types';
import EventInfoList from '@/entities/event/ui/EventInfoList';
import { useGetCurrentProfileQuery } from '@/features/profile/api/profileApi';
import {
  formatEventDetailsDate,
  formatEventSalesEndDate,
  getApiErrorMessage,
} from '@/shared/lib';
import ActionButtons from '@/shared/ui/ActionButtons';
import Button from '@/shared/ui/Button';
import {
  CalendarIcon,
  LocationIcon,
  MinusIcon,
  OrganizerIcon,
  PlusIcon,
} from '@/shared/ui/Icons';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';

import * as S from './styled';

interface EventRegistrationModalProps {
  isOpen: boolean;
  event: EventDetail;
  onClose: () => void;
}

export default function EventRegistrationModal({
  isOpen,
  event,
  onClose,
}: EventRegistrationModalProps): ReactNode {
  const [ticketsCount, setTicketsCount] = useState(1);

  const { data: profileData } = useGetCurrentProfileQuery(undefined, {
    skip: !isOpen,
  });

  const [createRegistration, { isLoading }] =
    useCreateParticipantEventRegistrationMutation();

  const maxTicketsCount = Math.max(
    Math.min(3, event.available_tickets_count),
    0,
  );

  const safeTicketsCount =
    maxTicketsCount > 0 ? Math.min(ticketsCount, maxTicketsCount) : 0;

  const profile = profileData?.data;

  const firstName = profile?.participant_profile?.first_name ?? '';
  const lastName = profile?.participant_profile?.last_name ?? '';
  const email = profile?.user.email ?? '';

  const handleDecrease = (): void => {
    setTicketsCount((currentValue) => Math.max(currentValue - 1, 1));
  };

  const handleIncrease = (): void => {
    setTicketsCount((currentValue) =>
      Math.min(currentValue + 1, maxTicketsCount),
    );
  };

  const handleSubmit = async (): Promise<void> => {
    if (safeTicketsCount < 1) {
      return;
    }

    try {
      await createRegistration({
        eventId: event.id,
        body: {
          tickets_count: safeTicketsCount,
        },
      }).unwrap();

      toast.success('Билет на мероприятие оформлен.');
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Запрос места"
      size="lg"
      closeOnOverlayClick={!isLoading}
      onClose={onClose}
      footer={
        <ActionButtons
          primaryText="Запросить место"
          secondaryText="Отменить"
          isLoading={isLoading}
          loadingText="Оформление..."
          primaryDisabled={safeTicketsCount < 1 || maxTicketsCount < 1}
          onPrimaryClick={handleSubmit}
          onSecondaryClick={onClose}
        />
      }
    >
      <S.Content>
        <S.Section>
          <S.SectionTitle>{event.title}</S.SectionTitle>

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
        </S.Section>

        <S.Divider />

        <S.TicketRow>
          <S.TicketInfo>
            <S.SectionTitle>Бесплатное</S.SectionTitle>
            <S.Hint>
              <span>
                Продажи заканчиваются {formatEventSalesEndDate(event.starts_at)}
                .
              </span>
              <span>Осталось мест: {event.available_tickets_count}</span>
            </S.Hint>
          </S.TicketInfo>

          <S.Counter>
            <Button
              size="xs"
              colorScheme="info"
              disabled={safeTicketsCount <= 1 || isLoading}
              onClick={handleDecrease}
            >
              <MinusIcon />
            </Button>

            <S.CounterValue>{safeTicketsCount}</S.CounterValue>

            <Button
              size="xs"
              colorScheme="accent"
              disabled={safeTicketsCount >= maxTicketsCount || isLoading}
              onClick={handleIncrease}
            >
              <PlusIcon />
            </Button>
          </S.Counter>
        </S.TicketRow>

        <S.Divider />

        <S.Section>
          <S.SectionTitle>Контактная информация</S.SectionTitle>

          <S.Hint>
            Данные используются для оформления билета на мероприятие.
          </S.Hint>

          <S.TwoColumns>
            <Input label="Фамилия" value={lastName} disabled readOnly />
            <Input label="Имя" value={firstName} disabled readOnly />
          </S.TwoColumns>

          <Input label="Почта" value={email} disabled readOnly />
        </S.Section>
      </S.Content>
    </Modal>
  );
}
