'use client';

import { ReactNode, useCallback, useState } from 'react';
import { toast } from 'sonner';

import {
  useExportOrganizerEventAnalyticsReportMutation,
  useGetOrganizerAnalyticsEventsQuery,
  useGetOrganizerEventAnalyticsQuery,
  useSendOrganizerEventRsvpMutation,
} from '@/entities/event/api/organizerAnalyticsApi';
import { useDeleteOrganizerEventMutation } from '@/entities/event/api/organizerEventsApi';
import {
  EventAnalyticsDetail,
  EventAnalyticsListItem,
} from '@/entities/event/model/analyticsTypes';
import { getApiErrorMessage, useDebouncedValue } from '@/shared/lib';
import PageLayout from '@/shared/ui/PageLayout';
import PageToolbar from '@/shared/ui/PageToolbar';
import EventAnalyticsModal from '@/widgets/EventAnalyticsModal/ui/EventAnalyticsModal';
import EventAnalyticsTable from '@/widgets/EventAnalyticsTable/ui/EventAnalyticsTable';

const DEFAULT_PAGE = 1;
const ANALYTICS_PAGE_LIMIT = 10;
const SEARCH_DELAY_MS = 800;

export default function OrganizerAnalyticsPage(): ReactNode {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [search, setSearch] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DELAY_MS);

  const { data, isLoading, isFetching } = useGetOrganizerAnalyticsEventsQuery({
    page,
    limit: ANALYTICS_PAGE_LIMIT,
    search: debouncedSearch,
  });

  const { data: analyticsData, isFetching: isAnalyticsFetching } =
    useGetOrganizerEventAnalyticsQuery(selectedEventId ?? '', {
      skip: selectedEventId === null,
    });

  const [sendRsvp] = useSendOrganizerEventRsvpMutation();
  const [deleteEvent] = useDeleteOrganizerEventMutation();

  const [exportEventAnalyticsReport, { isLoading: isExportLoading }] =
    useExportOrganizerEventAnalyticsReportMutation();

  const events = data?.data.items ?? [];
  const pagination = data?.data.pagination;
  const totalPages = pagination?.total_pages ?? 1;

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (nextPage: number): void => {
    setPage(nextPage);
  };

  const handleOpenAnalytics = useCallback(
    (event: EventAnalyticsListItem): void => {
      setSelectedEventId(event.id);
    },
    [],
  );

  const handleCloseAnalytics = (): void => {
    setSelectedEventId(null);
  };

  const handleSendRsvp = useCallback(
    async (event: EventAnalyticsListItem): Promise<void> => {
      try {
        setProcessingId(event.id);

        const response = await sendRsvp(event.id).unwrap();

        toast.success(`RSVP отправлено: ${response.data.sent_count}.`);
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setProcessingId(null);
      }
    },
    [sendRsvp],
  );

  const handleDelete = useCallback(
    async (eventId: string): Promise<void> => {
      try {
        setProcessingId(eventId);

        await deleteEvent(eventId).unwrap();

        toast.success('Мероприятие удалено.');

        if (events.length === 1 && page > DEFAULT_PAGE) {
          setPage((currentPage) => currentPage - 1);
        }
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setProcessingId(null);
      }
    },
    [deleteEvent, events.length, page],
  );

  const handleExportReport = async (
    analytics: EventAnalyticsDetail,
  ): Promise<void> => {
    try {
      await exportEventAnalyticsReport({
        eventId: analytics.id,
        filename: `event-analytics-${analytics.public_id}.xlsx`,
      }).unwrap();

      toast.success('Отчёт успешно экспортирован.');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <>
      <PageLayout
        title="Аналитика"
        toolbar={
          <PageToolbar
            search={{
              value: search,
              placeholder: 'Введите название мероприятия',
              onChange: handleSearchChange,
            }}
          />
        }
      >
        <EventAnalyticsTable
          events={events}
          page={page}
          limit={ANALYTICS_PAGE_LIMIT}
          totalPages={totalPages}
          processingId={processingId}
          isLoading={isLoading || isFetching}
          emptyText={
            debouncedSearch
              ? 'По вашему запросу ничего не найдено'
              : 'Аналитика мероприятий пока недоступна'
          }
          allowRsvp
          showOrganizer={false}
          onPageChange={handlePageChange}
          onOpenAnalytics={handleOpenAnalytics}
          onSendRsvp={handleSendRsvp}
          onDelete={handleDelete}
        />
      </PageLayout>

      <EventAnalyticsModal
        isOpen={selectedEventId !== null}
        analytics={analyticsData?.data ?? null}
        isLoading={isAnalyticsFetching}
        isExportLoading={isExportLoading}
        onClose={handleCloseAnalytics}
        onExportReport={handleExportReport}
      />
    </>
  );
}
