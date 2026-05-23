'use client';

import { ReactNode, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  useGetRsvpPreviewQuery,
  useRespondToRsvpMutation,
} from '@/entities/event/api/rsvpApi';
import { EventRsvpStatus } from '@/entities/event/model/registrationTypes';
import EventInfoList, {
  EventInfoListItem,
} from '@/entities/event/ui/EventInfoList';
import { formatDateTime, getApiErrorMessage } from '@/shared/lib';
import { routes } from '@/shared/model/routes';
import Button from '@/shared/ui/Button';
import {
  CalendarIcon,
  EventsIcon,
  LocationIcon,
  TicketIcon,
} from '@/shared/ui/Icons';

import * as S from './styled';

interface RsvpResponsePageProps {
  token: string;
}

export default function RsvpResponsePage({
  token,
}: RsvpResponsePageProps): ReactNode {
  const router = useRouter();

  const { data, isLoading, isFetching, isError } = useGetRsvpPreviewQuery(
    token,
    {
      skip: token.length === 0,
    },
  );

  const [respondToRsvp, { isLoading: isResponding }] =
    useRespondToRsvpMutation();

  const preview = data?.data ?? null;

  const actionText = useMemo(() => {
    if (!preview) {
      return '';
    }

    if (preview.action === EventRsvpStatus.ACCEPTED) {
      return 'подтвердить участие';
    }

    return 'отклонить участие';
  }, [preview]);

  const eventInfoItems = useMemo<EventInfoListItem[]>(() => {
    if (!preview) {
      return [];
    }

    return [
      {
        key: 'date',
        icon: <CalendarIcon />,
        text: formatDateTime(preview.starts_at),
      },
      {
        key: 'location',
        icon: <LocationIcon />,
        text: preview.location,
        title: preview.location,
      },
      {
        key: 'tickets',
        icon: <TicketIcon />,
        text: `Количество мест: ${preview.tickets_count}`,
      },
    ];
  }, [preview]);

  const handleRespond = async (): Promise<void> => {
    if (!token) {
      toast.error('RSVP-ссылка некорректна.');
      return;
    }

    try {
      const response = await respondToRsvp({ token }).unwrap();

      if (response.data.rsvp_status === EventRsvpStatus.ACCEPTED) {
        toast.success('Участие в мероприятии подтверждено.');
      } else {
        toast.success('Участие в мероприятии отклонено.');
      }

      router.push(routes.participant.tickets);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  if (!token) {
    return (
      <S.Page>
        <S.Card>
          <S.Title>RSVP-ссылка некорректна</S.Title>

          <S.Description>
            В ссылке отсутствует токен подтверждения. Проверьте письмо и
            попробуйте открыть ссылку ещё раз.
          </S.Description>
        </S.Card>
      </S.Page>
    );
  }

  if (isLoading || isFetching) {
    return (
      <S.Page>
        <S.Card>
          <S.Title>Загрузка RSVP</S.Title>

          <S.Description>
            Проверяем данные подтверждения участия...
          </S.Description>
        </S.Card>
      </S.Page>
    );
  }

  if (isError || !preview) {
    return (
      <S.Page>
        <S.Card>
          <S.Title>Не удалось открыть RSVP-ссылку</S.Title>

          <S.Description>
            Ссылка могла устареть, быть повреждена или заявка уже недоступна.
          </S.Description>

          <S.Actions>
            <Button fullWidth onClick={() => router.push(routes.home)}>
              На главную
            </Button>
          </S.Actions>
        </S.Card>
      </S.Page>
    );
  }

  const isAcceptAction = preview.action === EventRsvpStatus.ACCEPTED;
  const colorScheme = isAcceptAction ? 'info' : 'danger';
  const buttonTitle = isResponding
    ? 'Сохранение...'
    : isAcceptAction
      ? 'Подтвердить участие'
      : 'Отклонить участие';

  return (
    <S.Page>
      <S.Card>
        <S.IconWrapper $colorScheme={colorScheme}>
          <EventsIcon />
        </S.IconWrapper>

        <S.TextBlock>
          <S.Title>Подтверждение участия RSVP</S.Title>

          <S.Description>
            Вы собираетесь {actionText} в мероприятии.
          </S.Description>
        </S.TextBlock>

        <S.EventBlock>
          <S.EventTitle>{preview.title}</S.EventTitle>

          <EventInfoList items={eventInfoItems} truncate={false} />
        </S.EventBlock>

        <S.Actions>
          <Button
            fullWidth
            colorScheme={colorScheme}
            disabled={isResponding}
            onClick={handleRespond}
          >
            {buttonTitle}
          </Button>

          <Button
            fullWidth
            colorScheme="secondary"
            disabled={isResponding}
            onClick={() =>
              router.push(routes.public.eventDetails(preview.public_id))
            }
          >
            Открыть мероприятие
          </Button>
        </S.Actions>
      </S.Card>
    </S.Page>
  );
}
