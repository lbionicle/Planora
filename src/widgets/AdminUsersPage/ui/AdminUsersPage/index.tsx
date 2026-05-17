'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import {
  useDeleteAdminUserMutation,
  useGetAdminUsersQuery,
  useUpdateAdminUserStatusMutation,
} from '@/entities/adminUser/api/adminUsersApi';
import { DEFAULT_ADMIN_USERS_FILTERS } from '@/entities/adminUser/model/constants';
import { AdminUser, AdminUsersFilters } from '@/entities/adminUser/model/types';
import { UserStatus } from '@/entities/user/model/types';
import AdminUserEditModal from '@/features/adminUsers/ui/AdminUserEditModal';
import AdminUsersActiveFilters from '@/features/adminUsers/ui/AdminUsersActiveFilters';
import AdminUsersFiltersModal from '@/features/adminUsers/ui/AdminUsersFiltersModal';
import { getApiErrorMessage, useDebouncedValue } from '@/shared/lib';
import FilterButton from '@/shared/ui/FilterButton';
import { FilterIcon } from '@/shared/ui/Icons';
import PageLayout from '@/shared/ui/PageLayout';
import PageToolbar from '@/shared/ui/PageToolbar';
import PaginatedTable from '@/shared/ui/PaginatedTable';

import { getColumns } from '../../model/usersTableColumns';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SEARCH_DELAY_MS = 400;

export default function AdminUsersPage(): ReactNode {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<AdminUsersFilters>(
    DEFAULT_ADMIN_USERS_FILTERS,
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(search, SEARCH_DELAY_MS);

  const { data, isLoading, isFetching } = useGetAdminUsersQuery({
    page,
    limit: DEFAULT_LIMIT,
    search: debouncedSearch,
    role: filters.role ?? undefined,
    status: filters.status ?? undefined,
  });

  const [updateUserStatus] = useUpdateAdminUserStatusMutation();
  const [deleteUser] = useDeleteAdminUserMutation();

  const users = data?.data.items ?? [];
  const totalPages = data?.data.pagination.total_pages ?? 1;

  const handleSearchChange = useCallback((value: string): void => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  }, []);

  const handleApplyFilters = (nextFilters: AdminUsersFilters): void => {
    setFilters(nextFilters);
    setPage(DEFAULT_PAGE);
    setIsFiltersOpen(false);
  };

  const handleRoleFilterClear = (): void => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      role: null,
    }));
    setPage(DEFAULT_PAGE);
  };

  const handleStatusFilterClear = (): void => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      status: null,
    }));
    setPage(DEFAULT_PAGE);
  };

  const handleEdit = useCallback((user: AdminUser): void => {
    setEditingUserId(user.id);
  }, []);

  const handleCloseEditModal = (): void => {
    setEditingUserId(null);
  };

  const handleBlock = useCallback(
    async (userId: string): Promise<void> => {
      try {
        setProcessingId(userId);

        await updateUserStatus({
          userId,
          status: UserStatus.BLOCKED,
        }).unwrap();

        toast.success('Пользователь заблокирован.');
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setProcessingId(null);
      }
    },
    [updateUserStatus],
  );

  const handleUnblock = useCallback(
    async (userId: string): Promise<void> => {
      try {
        setProcessingId(userId);

        await updateUserStatus({
          userId,
          status: UserStatus.ACTIVE,
        }).unwrap();

        toast.success('Пользователь разблокирован.');
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setProcessingId(null);
      }
    },
    [updateUserStatus],
  );

  const handleDelete = useCallback(
    async (userId: string): Promise<void> => {
      try {
        setProcessingId(userId);

        await deleteUser(userId).unwrap();

        toast.success('Пользователь удалён.');
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setProcessingId(null);
      }
    },
    [deleteUser],
  );

  const columns = useMemo(
    () =>
      getColumns({
        page,
        limit: DEFAULT_LIMIT,
        processingId,
        onEdit: handleEdit,
        onBlock: handleBlock,
        onUnblock: handleUnblock,
        onDelete: handleDelete,
      }),
    [page, processingId, handleEdit, handleBlock, handleUnblock, handleDelete],
  );

  return (
    <>
      <PageLayout
        title="Пользователи"
        toolbar={
          <PageToolbar
            search={{
              value: search,
              placeholder: 'Введите ключевое слово для поиска',
              onChange: handleSearchChange,
            }}
            action={
              <FilterButton onClick={() => setIsFiltersOpen(true)}>
                <FilterIcon />
              </FilterButton>
            }
            bottom={
              <AdminUsersActiveFilters
                filters={filters}
                onRoleClear={handleRoleFilterClear}
                onStatusClear={handleStatusFilterClear}
              />
            }
          />
        }
      >
        <PaginatedTable
          data={users}
          columns={columns}
          page={page}
          totalPages={totalPages}
          isLoading={isLoading || isFetching}
          emptyText="Пользователи не найдены"
          getRowId={(row) => row.id}
          onPageChange={setPage}
        />
      </PageLayout>

      {isFiltersOpen && (
        <AdminUsersFiltersModal
          isOpen={isFiltersOpen}
          initialFilters={filters}
          onClose={() => setIsFiltersOpen(false)}
          onApply={handleApplyFilters}
        />
      )}

      <AdminUserEditModal
        isOpen={Boolean(editingUserId)}
        userId={editingUserId}
        onClose={handleCloseEditModal}
      />
    </>
  );
}
