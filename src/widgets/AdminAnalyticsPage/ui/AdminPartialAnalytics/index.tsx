'use client';

import { ReactNode, useCallback, useState } from 'react';
import { toast } from 'sonner';

import {
  useDeleteAdminAnalyticsEventMutation,
  useExportAdminEventAnalyticsReportMutation,
  useGetAdminAnalyticsEventsQuery,
  useGetAdminEventAnalyticsQuery,
} from '@/entities/event/api/adminAnalyticsApi';
import {
  EventAnalyticsDetail,
  EventAnalyticsListItem,
} from '@/entities/event/model/analyticsTypes';
import { getApiErrorMessage, useDebouncedValue } from '@/shared/lib';
import PageToolbar from '@/shared/ui/PageToolbar';
import EventAnalyticsModal from '@/widgets/EventAnalyticsModal/ui/EventAnalyticsModal';
import EventAnalyticsTable from '@/widgets/EventAnalyticsTable/ui/EventAnalyticsTable';

import * as S from './styled';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SEARCH_DELAY_MS = 400;

export default function AdminPartialAnalytics(): ReactNode {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [search, setSearch] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(search, SEARCH_DELAY_MS);

  const { data, isLoading, isFetching } = useGetAdminAnalyticsEventsQuery({
    page,
    limit: DEFAULT_LIMIT,
    search: debouncedSearch,
  });

  const {
    data: detailData,
    isLoading: isDetailLoading,
    isFetching: isDetailFetching,
  } = useGetAdminEventAnalyticsQuery(selectedEventId ?? '', {
    skip: !selectedEventId,
  });

  const [exportEventAnalyticsReport, { isLoading: isExportLoading }] =
    useExportAdminEventAnalyticsReportMutation();

  const [deleteEvent] = useDeleteAdminAnalyticsEventMutation();

  const events = data?.data.items ?? [];
  const totalPages = data?.data.pagination.total_pages ?? 1;
  const analytics = detailData?.data ?? null;

  const handleSearchChange = useCallback((value: string): void => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  }, []);

  const handleOpenAnalytics = useCallback(
    (event: EventAnalyticsListItem): void => {
      setSelectedEventId(event.id);
    },
    [],
  );

  const handleCloseAnalytics = (): void => {
    setSelectedEventId(null);
  };

  const handleDelete = async (eventId: string): Promise<void> => {
    try {
      setProcessingId(eventId);

      await deleteEvent(eventId).unwrap();

      if (selectedEventId === eventId) {
        setSelectedEventId(null);
      }

      if (events.length === 1 && page > DEFAULT_PAGE) {
        setPage((currentPage) => currentPage - 1);
      }

      toast.success('Мероприятие удалено.');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setProcessingId(null);
    }
  };

  const handleExportReport = async (
    analytics: EventAnalyticsDetail,
  ): Promise<void> => {
    try {
      await exportEventAnalyticsReport({
        eventId: analytics.id,
        filename: `admin-event-analytics-${analytics.public_id}.xlsx`,
      }).unwrap();

      toast.success('Отчёт успешно экспортирован.');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <>
      <S.Content>
        <PageToolbar
          search={{
            value: search,
            placeholder: 'Введите название мероприятия',
            onChange: handleSearchChange,
          }}
        />

        <EventAnalyticsTable
          events={events}
          page={page}
          limit={DEFAULT_LIMIT}
          totalPages={totalPages}
          processingId={processingId}
          isLoading={isLoading || isFetching}
          emptyText="Мероприятия для аналитики не найдены"
          showOrganizer
          allowRsvp={false}
          onPageChange={setPage}
          onOpenAnalytics={handleOpenAnalytics}
          onDelete={handleDelete}
        />
      </S.Content>

      {selectedEventId && (
        <EventAnalyticsModal
          isOpen={Boolean(selectedEventId)}
          analytics={analytics}
          isLoading={isDetailLoading || isDetailFetching}
          isExportLoading={isExportLoading}
          onClose={handleCloseAnalytics}
          onExportReport={handleExportReport}
        />
      )}
    </>
  );
}
