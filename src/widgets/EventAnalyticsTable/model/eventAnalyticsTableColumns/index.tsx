'use client';

import { ColumnDef } from '@tanstack/react-table';

import { EventAnalyticsListItem } from '@/entities/event/model/analyticsTypes';
import {
  eventFormatLabels,
  eventStatusLabels,
} from '@/entities/event/model/constants';
import { EventStatus } from '@/entities/event/model/types';
import { formatDateTime } from '@/shared/lib';
import { AnalyticsIcon, TicketIcon, TrashIcon } from '@/shared/ui/Icons';
import TableActions from '@/shared/ui/TableActions';

import * as S from './styled';

interface GetEventAnalyticsTableColumnsParams {
  page: number;
  limit: number;
  processingId: string | null;
  showOrganizer: boolean;
  allowRsvp: boolean;
  onOpenAnalytics: (event: EventAnalyticsListItem) => void;
  onSendRsvp?: (event: EventAnalyticsListItem) => void | Promise<void>;
  onDelete: (eventId: string) => void | Promise<void>;
}

export function getEventAnalyticsTableColumns({
  page,
  limit,
  processingId,
  showOrganizer,
  allowRsvp,
  onOpenAnalytics,
  onSendRsvp,
  onDelete,
}: GetEventAnalyticsTableColumnsParams): ColumnDef<EventAnalyticsListItem>[] {
  const columns: ColumnDef<EventAnalyticsListItem>[] = [
    {
      id: 'index',
      header: '№',
      size: 64,
      cell: ({ row }) => (page - 1) * limit + row.index + 1,
      meta: {
        disableTooltip: true,
      },
    },
    {
      accessorKey: 'title',
      header: 'Название',
      size: 220,
    },
  ];

  if (showOrganizer) {
    columns.push({
      accessorKey: 'organizer_name',
      header: 'Организатор',
      size: 180,
    });
  }

  columns.push(
    {
      accessorKey: 'starts_at',
      header: 'Дата и время',
      size: 160,
      cell: ({ row }) => formatDateTime(row.original.starts_at),
      meta: {
        getTooltip: (row: EventAnalyticsListItem) =>
          formatDateTime(row.starts_at),
      },
    },
    {
      accessorKey: 'format',
      header: 'Формат',
      size: 120,
      cell: ({ row }) => eventFormatLabels[row.original.format],
    },
    {
      accessorKey: 'status',
      header: 'Статус',
      size: 140,
      cell: ({ row }) => (
        <S.Status $status={row.original.status}>
          {eventStatusLabels[row.original.status]}
        </S.Status>
      ),
      meta: {
        disableTooltip: true,
      },
    },
    {
      accessorKey: 'tickets_count',
      header: 'Всего мест',
      size: 110,
    },
    {
      accessorKey: 'registrations_count',
      header: 'Заявки',
      size: 100,
    },
    {
      accessorKey: 'registered_tickets_count',
      header: 'Занято',
      size: 100,
    },
    {
      accessorKey: 'available_tickets_count',
      header: 'Свободно',
      size: 110,
    },
    {
      accessorKey: 'occupancy_percent',
      header: 'Заполненность',
      size: 140,
      cell: ({ row }) => `${row.original.occupancy_percent}%`,
      meta: {
        disableTooltip: true,
      },
    },
    {
      accessorKey: 'rsvp_waiting_count',
      header: 'Ожидают RSVP',
      size: 140,
    },
    {
      accessorKey: 'rsvp_accepted_count',
      header: 'Подтвердили',
      size: 130,
    },
    {
      accessorKey: 'rsvp_declined_count',
      header: 'Отказались',
      size: 120,
    },
    {
      id: 'actions',
      header: 'Действия',
      size: allowRsvp ? 190 : 140,
      cell: ({ row }) => {
        const event = row.original;
        const isProcessing = processingId === event.id;

        const canSendRsvp =
          allowRsvp &&
          Boolean(onSendRsvp) &&
          event.status === EventStatus.PUBLISHED &&
          event.rsvp_waiting_count > 0;

        return (
          <TableActions
            actions={[
              {
                key: 'rsvp',
                icon: <TicketIcon />,
                colorScheme: 'info',
                title: 'Разослать RSVP',
                hidden: !allowRsvp,
                disabled: isProcessing || !canSendRsvp,
                confirm: {
                  title: 'Разослать RSVP?',
                  description:
                    'RSVP-запросы будут отправлены всем участникам, которые ещё не ответили.',
                  icon: <TicketIcon />,
                  confirmText: 'Разослать',
                  cancelText: 'Отменить',
                  confirmColorScheme: 'accent',
                },
                onClick: async () => {
                  if (!onSendRsvp) {
                    return;
                  }

                  await onSendRsvp(event);
                },
              },
              {
                key: 'analytics',
                icon: <AnalyticsIcon />,
                colorScheme: 'info',
                title: 'Открыть аналитику',
                disabled: isProcessing,
                onClick: () => onOpenAnalytics(event),
              },
              {
                key: 'delete',
                icon: <TrashIcon />,
                colorScheme: 'danger',
                title: 'Удалить мероприятие',
                disabled: isProcessing,
                confirm: {
                  title: 'Удалить мероприятие?',
                  description:
                    'После удаления мероприятие пропадет из системы, а восстановить его будет нельзя.',
                  icon: <TrashIcon />,
                  confirmText: 'Удалить',
                  cancelText: 'Отменить',
                  confirmColorScheme: 'danger',
                },
                onClick: () => onDelete(event.id),
              },
            ]}
          />
        );
      },
      meta: {
        disableTooltip: true,
      },
    },
  );

  return columns;
}
