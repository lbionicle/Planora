'use client';

import { ReactNode } from 'react';

import {
  eventCategoryLabels,
  eventFormatLabels,
} from '@/entities/event/model/constants';
import ActiveFilters, { ActiveFilterItem } from '@/shared/ui/ActiveFilters';
import { formatFilterDate } from '@/widgets/EventsPage/lib';
import { PublicEventsFilters } from '@/widgets/EventsPage/model/types';

interface PublicEventsActiveFiltersProps {
  filters: PublicEventsFilters;
  onCategoryClear: () => void;
  onFormatClear: () => void;
  onDateClear: () => void;
}

export default function PublicEventsActiveFilters({
  filters,
  onCategoryClear,
  onFormatClear,
  onDateClear,
}: PublicEventsActiveFiltersProps): ReactNode {
  const items: ActiveFilterItem[] = [];

  if (filters.category) {
    items.push({
      key: 'category',
      label: eventCategoryLabels[filters.category],
      onClear: onCategoryClear,
    });
  }

  if (filters.format) {
    items.push({
      key: 'format',
      label: eventFormatLabels[filters.format],
      onClear: onFormatClear,
    });
  }

  if (filters.date) {
    items.push({
      key: 'date',
      label: formatFilterDate(filters.date),
      onClear: onDateClear,
    });
  }

  return <ActiveFilters items={items} />;
}
