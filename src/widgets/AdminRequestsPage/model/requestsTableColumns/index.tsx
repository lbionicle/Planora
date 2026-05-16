'use client';

import { ColumnDef } from '@tanstack/react-table';

import { OrganizerRequest } from '@/entities/organizerRequest/model/types';
import { formatDateTime } from '@/shared/lib';
import { CloseFillIcon, SuccessFillIcon } from '@/shared/ui/Icons';

import * as S from './styled';

interface GetColumnsParams {
  page: number;
  limit: number;
  processingId: string | null;
  onDownload: (requestId: string) => void;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export function getColumns({
  page,
  limit,
  processingId,
  onDownload,
  onApprove,
  onReject,
}: GetColumnsParams): ColumnDef<OrganizerRequest>[] {
  return [
    {
      id: 'index',
      header: '№',
      size: 64,
      cell: ({ row }) => (page - 1) * limit + row.index + 1,
    },
    {
      accessorKey: 'company_name',
      header: 'Наименование',
      size: 180,
    },
    {
      accessorKey: 'corporate_email',
      header: 'Корпоративная почта',
      size: 180,
    },
    {
      accessorKey: 'created_at',
      header: 'Дата подачи заявки',
      size: 180,
      cell: ({ row }) => formatDateTime(row.original.created_at),
    },
    {
      id: 'file',
      header: 'Файл',
      size: 120,
      cell: ({ row }) => (
        <S.DownloadButton
          type="button"
          disabled={!row.original.has_verification_file}
          onClick={() => onDownload(row.original.id)}
        >
          Скачать
        </S.DownloadButton>
      ),
    },
    {
      id: 'actions',
      header: 'Действия',
      size: 140,
      cell: ({ row }) => {
        const isProcessing = processingId === row.original.id;

        return (
          <S.Actions>
            <S.AcceptButton
              size="xs"
              colorScheme="success"
              disabled={isProcessing}
              type="button"
              onClick={() => onApprove(row.original.id)}
            >
              <SuccessFillIcon />
            </S.AcceptButton>

            <S.RejectedButton
              size="xs"
              colorScheme="danger"
              disabled={isProcessing}
              onClick={() => onReject(row.original.id)}
            >
              <CloseFillIcon />
            </S.RejectedButton>
          </S.Actions>
        );
      },
    },
  ];
}
