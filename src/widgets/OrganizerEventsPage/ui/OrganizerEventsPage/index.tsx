'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  useDeleteOrganizerEventMutation,
  useGetOrganizerEventsQuery,
} from '@/entities/event/api/organizerEventsApi';
import { DEFAULT_EVENT_FILTERS } from '@/entities/event/model/constants';
import { EventFilters, EventListItem } from '@/entities/event/model/types';
import EventActiveFilters from '@/features/organizerEvents/ui/EventActiveFilters';
import EventFiltersModal from '@/features/organizerEvents/ui/EventFiltersModal';
import EventFormModal from '@/features/organizerEvents/ui/EventFormModal';
import { getApiErrorMessage, useDebouncedValue } from '@/shared/lib';
import { routes } from '@/shared/model/routes';
import FilterButton from '@/shared/ui/FilterButton';
import { FilterIcon, PlusIcon } from '@/shared/ui/Icons';
import PageLayout from '@/shared/ui/PageLayout';
import PageToolbar from '@/shared/ui/PageToolbar';
import PaginatedTable from '@/shared/ui/PaginatedTable';

import { getColumns } from '../../model/eventsTableColumns';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SEARCH_DELAY_MS = 400;

export default function OrganizerEventsPage(): ReactNode {
  const router = useRouter();

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<EventFilters>(DEFAULT_EVENT_FILTERS);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(search, SEARCH_DELAY_MS);

  const { data, isLoading, isFetching } = useGetOrganizerEventsQuery({
    page,
    limit: DEFAULT_LIMIT,
    search: debouncedSearch,
    category: filters.category ?? undefined,
    visibility: filters.visibility ?? undefined,
    format: filters.format ?? undefined,
    status: filters.status ?? undefined,
  });

  const [deleteEvent] = useDeleteOrganizerEventMutation();

  const events = data?.data.items ?? [];
  const totalPages = data?.data.pagination.total_pages ?? 1;

  const handleSearchChange = useCallback((value: string): void => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  }, []);

  const handleApplyFilters = (nextFilters: EventFilters): void => {
    setFilters(nextFilters);
    setPage(DEFAULT_PAGE);
    setIsFiltersOpen(false);
  };

  const handleOpen = useCallback(
    (event: EventListItem): void => {
      router.push(routes.public.eventDetails(event.public_id));
    },
    [router],
  );

  const handleEdit = useCallback((event: EventListItem): void => {
    setEditingEventId(event.id);
  }, []);

  const handleDelete = useCallback(
    async (eventId: string): Promise<void> => {
      try {
        setProcessingId(eventId);

        await deleteEvent(eventId).unwrap();

        toast.success('Мероприятие удалено.');
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setProcessingId(null);
      }
    },
    [deleteEvent],
  );

  const columns = useMemo(
    () =>
      getColumns({
        page,
        limit: DEFAULT_LIMIT,
        processingId,
        onOpen: handleOpen,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    [page, processingId, handleOpen, handleEdit, handleDelete],
  );

  return (
    <>
      <PageLayout
        title="Мои мероприятия"
        toolbar={
          <PageToolbar
            search={{
              value: search,
              placeholder: 'Введите ключевое слово для поиска',
              onChange: handleSearchChange,
            }}
            action={
              <>
                <FilterButton onClick={() => setIsFiltersOpen(true)}>
                  <FilterIcon />
                </FilterButton>

                <FilterButton onClick={() => setIsCreateOpen(true)}>
                  <PlusIcon />
                </FilterButton>
              </>
            }
            bottom={
              <EventActiveFilters
                filters={filters}
                onCategoryClear={() =>
                  setFilters((currentFilters) => ({
                    ...currentFilters,
                    category: null,
                  }))
                }
                onVisibilityClear={() =>
                  setFilters((currentFilters) => ({
                    ...currentFilters,
                    visibility: null,
                  }))
                }
                onFormatClear={() =>
                  setFilters((currentFilters) => ({
                    ...currentFilters,
                    format: null,
                  }))
                }
                onStatusClear={() =>
                  setFilters((currentFilters) => ({
                    ...currentFilters,
                    status: null,
                  }))
                }
              />
            }
          />
        }
      >
        <PaginatedTable
          data={events}
          columns={columns}
          page={page}
          totalPages={totalPages}
          isLoading={isLoading || isFetching}
          emptyText="Мероприятия не найдены"
          getRowId={(row) => row.id}
          onPageChange={setPage}
        />
      </PageLayout>

      {isFiltersOpen && (
        <EventFiltersModal
          isOpen={isFiltersOpen}
          initialFilters={filters}
          onClose={() => setIsFiltersOpen(false)}
          onApply={handleApplyFilters}
        />
      )}

      {isCreateOpen && (
        <EventFormModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      )}

      {editingEventId && (
        <EventFormModal
          isOpen={Boolean(editingEventId)}
          eventId={editingEventId}
          onClose={() => setEditingEventId(null)}
        />
      )}
    </>
  );
}
