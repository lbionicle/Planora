'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  eventCategoryLabels,
  eventFormatLabels,
  eventStatusLabels,
  eventVisibilityLabels,
} from '@/entities/event/model/constants';
import { EventListItem, EventStatus } from '@/entities/event/model/types';
import { formatDateTime } from '@/shared/lib';
import { EditIcon, EyeIcon, TrashIcon } from '@/shared/ui/Icons';
import TableActions from '@/shared/ui/TableActions';

import * as S from './styled';

interface GetColumnsParams {
  page: number;
  limit: number;
  processingId: string | null;
  onOpen: (event: EventListItem) => void;
  onEdit: (event: EventListItem) => void;
  onDelete: (eventId: string) => void | Promise<void>;
}

export function getColumns({
  page,
  limit,
  processingId,
  onOpen,
  onEdit,
  onDelete,
}: GetColumnsParams): ColumnDef<EventListItem>[] {
  return [
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
      size: 180,
    },
    {
      accessorKey: 'category',
      header: 'Категория',
      size: 120,
      cell: ({ row }) => eventCategoryLabels[row.original.category],
    },
    {
      accessorKey: 'visibility',
      header: 'Доступ',
      size: 120,
      cell: ({ row }) => eventVisibilityLabels[row.original.visibility],
    },
    {
      accessorKey: 'format',
      header: 'Формат',
      size: 120,
      cell: ({ row }) => eventFormatLabels[row.original.format],
    },
    {
      accessorKey: 'starts_at',
      header: 'Дата и время',
      size: 150,
      cell: ({ row }) => formatDateTime(row.original.starts_at),
      meta: {
        getTooltip: (row: EventListItem) => formatDateTime(row.starts_at),
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
      size: 150,
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
      id: 'actions',
      header: 'Действия',
      size: 180,
      cell: ({ row }) => {
        const event = row.original;
        const isProcessing = processingId === event.id;
        const canOpen = event.status === EventStatus.PUBLISHED;

        return (
          <TableActions
            actions={[
              {
                key: 'open',
                icon: <EyeIcon />,
                colorScheme: 'info',
                title: 'Открыть страницу мероприятия',
                disabled: isProcessing || !canOpen,
                onClick: () => onOpen(event),
              },
              {
                key: 'edit',
                icon: <EditIcon />,
                colorScheme: 'info',
                title: 'Редактировать мероприятие',
                disabled: isProcessing,
                onClick: () => onEdit(event),
              },
              {
                key: 'delete',
                icon: <TrashIcon />,
                colorScheme: 'danger',
                title: 'Удалить мероприятие',
                disabled: isProcessing,
                confirm: {
                  title: 'Вы уверены, что хотите удалить это мероприятие?',
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
  ];
}
