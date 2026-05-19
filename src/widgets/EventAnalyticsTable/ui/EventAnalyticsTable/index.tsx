'use client';

import { ReactNode, useMemo } from 'react';

import { EventAnalyticsListItem } from '@/entities/event/model/analyticsTypes';
import PaginatedTable from '@/shared/ui/PaginatedTable';

import { getEventAnalyticsTableColumns } from '../../model/eventAnalyticsTableColumns';

interface EventAnalyticsTableProps {
  events: EventAnalyticsListItem[];
  page: number;
  limit: number;
  totalPages: number;
  processingId: string | null;
  isLoading?: boolean;
  emptyText?: string;
  showOrganizer?: boolean;
  allowRsvp?: boolean;
  onPageChange: (page: number) => void;
  onOpenAnalytics: (event: EventAnalyticsListItem) => void;
  onSendRsvp?: (event: EventAnalyticsListItem) => void | Promise<void>;
  onDelete: (eventId: string) => void | Promise<void>;
}

export default function EventAnalyticsTable({
  events,
  page,
  limit,
  totalPages,
  processingId,
  isLoading = false,
  emptyText = 'Данные аналитики не найдены',
  showOrganizer = false,
  allowRsvp = false,
  onPageChange,
  onOpenAnalytics,
  onSendRsvp,
  onDelete,
}: EventAnalyticsTableProps): ReactNode {
  const columns = useMemo(
    () =>
      getEventAnalyticsTableColumns({
        page,
        limit,
        processingId,
        showOrganizer,
        allowRsvp,
        onOpenAnalytics,
        onSendRsvp,
        onDelete,
      }),
    [
      page,
      limit,
      processingId,
      showOrganizer,
      allowRsvp,
      onOpenAnalytics,
      onSendRsvp,
      onDelete,
    ],
  );

  return (
    <PaginatedTable
      data={events}
      columns={columns}
      page={page}
      totalPages={totalPages}
      isLoading={isLoading}
      emptyText={emptyText}
      getRowId={(event) => event.id}
      onPageChange={onPageChange}
    />
  );
}
