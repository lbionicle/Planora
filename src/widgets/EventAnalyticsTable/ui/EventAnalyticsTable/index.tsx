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
  allowInvitation?: boolean;
  allowDelete?: boolean;
  onPageChange: (page: number) => void;
  onOpenAnalytics: (event: EventAnalyticsListItem) => void;
  onOpenInvitation?: (event: EventAnalyticsListItem) => void;
  onSendRsvp?: (event: EventAnalyticsListItem) => void | Promise<void>;
  onDelete?: (eventId: string) => void | Promise<void>;
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
  allowInvitation = false,
  allowDelete = false,
  onPageChange,
  onOpenAnalytics,
  onOpenInvitation,
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
        allowInvitation,
        allowDelete,
        onOpenAnalytics,
        onOpenInvitation,
        onSendRsvp,
        onDelete,
      }),
    [
      page,
      limit,
      processingId,
      showOrganizer,
      allowRsvp,
      allowInvitation,
      allowDelete,
      onOpenAnalytics,
      onOpenInvitation,
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
