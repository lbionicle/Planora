'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  userRoleLabels,
  userStatusLabels,
} from '@/entities/adminUser/model/constants';
import { AdminUser } from '@/entities/adminUser/model/types';
import { UserStatus } from '@/entities/user/model/types';
import { formatDateTime } from '@/shared/lib';
import { EditIcon, LockIcon, TrashIcon, UnLockIcon } from '@/shared/ui/Icons';
import TableActions from '@/shared/ui/TableActions';

import * as S from './styled';

interface GetColumnsParams {
  page: number;
  limit: number;
  processingId: string | null;
  onEdit: (user: AdminUser) => void;
  onBlock: (userId: string) => void | Promise<void>;
  onUnblock: (userId: string) => void | Promise<void>;
  onDelete: (userId: string) => void | Promise<void>;
}

export function getColumns({
  page,
  limit,
  processingId,
  onEdit,
  onBlock,
  onUnblock,
  onDelete,
}: GetColumnsParams): ColumnDef<AdminUser>[] {
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
      accessorKey: 'name',
      header: 'Пользователь',
      size: 200,
    },
    {
      accessorKey: 'email',
      header: 'Электронная почта',
      size: 220,
    },
    {
      accessorKey: 'role',
      header: 'Роль',
      size: 140,
      cell: ({ row }) => userRoleLabels[row.original.role],
    },
    {
      accessorKey: 'status',
      header: 'Статус',
      size: 150,
      cell: ({ row }) => (
        <S.Status $status={row.original.status}>
          {userStatusLabels[row.original.status]}
        </S.Status>
      ),
      meta: {
        disableTooltip: true,
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Дата регистрации',
      size: 180,
      cell: ({ row }) => formatDateTime(row.original.created_at),
      meta: {
        getTooltip: (row: AdminUser) => formatDateTime(row.created_at),
      },
    },
    {
      id: 'actions',
      header: 'Действия',
      size: 150,
      cell: ({ row }) => {
        const user = row.original;
        const isProcessing = processingId === user.id;
        const isBlocked = user.status === UserStatus.BLOCKED;

        return (
          <TableActions
            actions={[
              {
                key: isBlocked ? 'unblock' : 'block',
                icon: isBlocked ? <UnLockIcon /> : <LockIcon />,
                colorScheme: isBlocked ? 'success' : 'danger',
                title: isBlocked
                  ? 'Разблокировать пользователя'
                  : 'Заблокировать пользователя',
                disabled: isProcessing,
                confirm: isBlocked
                  ? undefined
                  : {
                      title:
                        'Вы уверены, что хотите заблокировать этого пользователя?',
                      description:
                        'После блокировки он не сможет войти в систему и пользоваться доступными ему функциями.',
                      icon: <LockIcon />,
                      confirmText: 'Заблокировать',
                      cancelText: 'Отменить',
                      confirmColorScheme: 'danger',
                    },
                onClick: () =>
                  isBlocked ? onUnblock(user.id) : onBlock(user.id),
              },
              {
                key: 'edit',
                icon: <EditIcon />,
                colorScheme: 'info',
                title: 'Редактировать пользователя',
                disabled: isProcessing,
                onClick: () => onEdit(user),
              },
              {
                key: 'delete',
                icon: <TrashIcon />,
                colorScheme: 'neutral',
                title: 'Удалить пользователя',
                disabled: isProcessing,
                confirm: {
                  title: 'Вы уверены, что хотите удалить этого пользователя?',
                  description:
                    'Это действие может привести к потере связанных данных и истории работы в системе.',
                  icon: <TrashIcon />,
                  confirmText: 'Удалить',
                  cancelText: 'Отменить',
                  confirmColorScheme: 'danger',
                },
                onClick: () => onDelete(user.id),
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
