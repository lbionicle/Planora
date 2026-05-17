'use client';

import { ReactNode } from 'react';

import {
  eventCategoryLabels,
  eventFormatLabels,
  eventStatusLabels,
  eventVisibilityLabels,
} from '@/entities/event/model/constants';
import { EventFilters } from '@/entities/event/model/types';
import ActiveFilters, { ActiveFilterItem } from '@/shared/ui/ActiveFilters';

interface EventActiveFiltersProps {
  filters: EventFilters;
  onCategoryClear: () => void;
  onVisibilityClear: () => void;
  onFormatClear: () => void;
  onStatusClear: () => void;
}

export default function EventActiveFilters({
  filters,
  onCategoryClear,
  onVisibilityClear,
  onFormatClear,
  onStatusClear,
}: EventActiveFiltersProps): ReactNode {
  const items: ActiveFilterItem[] = [];

  if (filters.category) {
    items.push({
      key: 'category',
      label: eventCategoryLabels[filters.category],
      onClear: onCategoryClear,
    });
  }

  if (filters.visibility) {
    items.push({
      key: 'visibility',
      label: eventVisibilityLabels[filters.visibility],
      onClear: onVisibilityClear,
    });
  }

  if (filters.format) {
    items.push({
      key: 'format',
      label: eventFormatLabels[filters.format],
      onClear: onFormatClear,
    });
  }

  if (filters.status) {
    items.push({
      key: 'status',
      label: eventStatusLabels[filters.status],
      onClear: onStatusClear,
    });
  }

  return <ActiveFilters items={items} />;
}
