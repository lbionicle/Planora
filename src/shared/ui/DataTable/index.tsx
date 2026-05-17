'use client';

import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import * as S from './styled';

interface DataTableColumnMeta<TData> {
  getTooltip?: (row: TData) => string | null | undefined;
  disableTooltip?: boolean;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
  emptyText?: string;
  getRowId: (row: TData) => string;
}

function getCellTitle<TData>(cell: Cell<TData, unknown>): string | undefined {
  const meta = cell.column.columnDef.meta as
    | DataTableColumnMeta<TData>
    | undefined;

  if (meta?.disableTooltip) {
    return undefined;
  }

  const customTooltip = meta?.getTooltip?.(cell.row.original);

  if (customTooltip) {
    return customTooltip;
  }

  const value = cell.getValue();

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  return undefined;
}

export default function DataTable<TData>({
  data,
  columns,
  isLoading = false,
  emptyText = 'Данные не найдены',
  getRowId,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <S.Wrapper>
      <S.Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <S.HeaderRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const headerTitle =
                  typeof header.column.columnDef.header === 'string'
                    ? header.column.columnDef.header
                    : undefined;

                return (
                  <S.Th key={header.id} $width={header.column.columnDef.size}>
                    <S.CellContent title={headerTitle}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </S.CellContent>
                  </S.Th>
                );
              })}
            </S.HeaderRow>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <S.BodyRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <S.Td key={cell.id} $width={cell.column.columnDef.size}>
                  <S.CellContent title={getCellTitle(cell)}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </S.CellContent>
                </S.Td>
              ))}
            </S.BodyRow>
          ))}
        </tbody>
      </S.Table>

      {isLoading && <S.Empty>Загрузка данных...</S.Empty>}

      {!isLoading && data.length === 0 && <S.Empty>{emptyText}</S.Empty>}
    </S.Wrapper>
  );
}
