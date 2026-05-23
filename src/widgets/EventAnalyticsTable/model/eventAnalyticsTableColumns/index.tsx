'use client';

import { ColumnDef } from '@tanstack/react-table';

import { EventAnalyticsListItem } from '@/entities/event/model/analyticsTypes';
import {
  eventFormatLabels,
  eventStatusLabels,
} from '@/entities/event/model/constants';
import { formatDateTime } from '@/shared/lib';
import { AnalyticsIcon, TicketIcon, TrashIcon } from '@/shared/ui/Icons';
import TableActions, { TableActionItem } from '@/shared/ui/TableActions';

import * as S from './styled';

interface GetEventAnalyticsTableColumnsParams {
  page: number;
  limit: number;
  processingId: string | null;
  showOrganizer: boolean;
  allowRsvp: boolean;
  onOpenAnalytics: (event: EventAnalyticsListItem) => void;
  onSendRsvp?: (event: EventAnalyticsListItem) => void | Promise<void>;
  onDelete?: (eventId: string) => void | Promise<void>;
}

function getOccupancyText(event: EventAnalyticsListItem): string {
  return `${event.occupancy_percent}%`;
}

function getTicketsText(event: EventAnalyticsListItem): string {
  return `${event.registered_tickets_count} / ${event.tickets_count}`;
}

function getRsvpText(event: EventAnalyticsListItem): string {
  return `${event.rsvp_accepted_count} / ${event.rsvp_declined_count} / ${event.rsvp_waiting_count}`;
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
      header: 'Мероприятие',
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
      accessorKey: 'format',
      header: 'Формат',
      size: 120,
      cell: ({ row }) => eventFormatLabels[row.original.format],
    },
    {
      accessorKey: 'starts_at',
      header: 'Дата начала',
      size: 160,
      cell: ({ row }) => formatDateTime(row.original.starts_at),
      meta: {
        getTooltip: (row: EventAnalyticsListItem) =>
          formatDateTime(row.starts_at),
      },
    },
    {
      accessorKey: 'location',
      header: 'Место проведения',
      size: 220,
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
      id: 'tickets',
      header: 'Места',
      size: 110,
      cell: ({ row }) => getTicketsText(row.original),
      meta: {
        getTooltip: (row: EventAnalyticsListItem) =>
          `Занято ${row.registered_tickets_count} из ${row.tickets_count}`,
      },
    },
    {
      accessorKey: 'occupancy_percent',
      header: 'Заполненность',
      size: 130,
      cell: ({ row }) => getOccupancyText(row.original),
    },
    {
      accessorKey: 'registrations_count',
      header: 'Заявки',
      size: 100,
    },
    {
      id: 'rsvp',
      header: 'RSVP',
      size: 150,
      cell: ({ row }) => getRsvpText(row.original),
      meta: {
        getTooltip: (row: EventAnalyticsListItem) =>
          `Подтвердили: ${row.rsvp_accepted_count}, отказались: ${row.rsvp_declined_count}, ожидают: ${row.rsvp_waiting_count}`,
      },
    },
    {
      id: 'actions',
      header: 'Действия',
      size: 170,
      cell: ({ row }) => {
        const event = row.original;
        const isProcessing = processingId === event.id;

        const actions: TableActionItem[] = [
          {
            key: 'analytics',
            icon: <AnalyticsIcon />,
            colorScheme: 'info',
            title: 'Открыть аналитику мероприятия',
            disabled: isProcessing,
            onClick: () => onOpenAnalytics(event),
          },
        ];

        if (allowRsvp && onSendRsvp) {
          actions.push({
            key: 'rsvp',
            icon: <TicketIcon />,
            colorScheme: 'info',
            title: 'Разослать RSVP участникам без ответа',
            disabled: isProcessing || event.rsvp_waiting_count === 0,
            confirm: {
              title: 'Разослать RSVP?',
              description:
                'RSVP-запросы будут отправлены участникам, которые ещё не подтвердили и не отклонили участие.',
              icon: <TicketIcon />,
              confirmText: 'Разослать',
              cancelText: 'Отменить',
              confirmColorScheme: 'info',
            },
            onClick: () => onSendRsvp(event),
          });
        }

        if (onDelete) {
          actions.push({
            key: 'delete',
            icon: <TrashIcon />,
            colorScheme: 'danger',
            title: 'Удалить мероприятие',
            disabled: isProcessing,
            confirm: {
              title: 'Удалить мероприятие?',
              description:
                'После удаления мероприятие пропадёт из системы, восстановить его будет нельзя.',
              icon: <TrashIcon />,
              confirmText: 'Удалить',
              cancelText: 'Отменить',
              confirmColorScheme: 'danger',
            },
            onClick: () => onDelete(event.id),
          });
        }

        return <TableActions actions={actions} />;
      },
      meta: {
        disableTooltip: true,
      },
    },
  );

  return columns;
}
