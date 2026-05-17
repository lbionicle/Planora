'use client';

import { ColumnDef } from '@tanstack/react-table';

import DataTable from '@/shared/ui/DataTable';
import Pagination from '@/shared/ui/Pagination';

import * as S from './styled';

interface PaginatedTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  page: number;
  totalPages: number;
  isLoading?: boolean;
  emptyText?: string;
  getRowId: (row: TData) => string;
  onPageChange: (page: number) => void;
}

export default function PaginatedTable<TData>({
  data,
  columns,
  page,
  totalPages,
  isLoading = false,
  emptyText = 'Данные не найдены',
  getRowId,
  onPageChange,
}: PaginatedTableProps<TData>) {
  return (
    <S.Card>
      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyText={emptyText}
        getRowId={getRowId}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </S.Card>
  );
}
