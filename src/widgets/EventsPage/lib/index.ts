import { PublicEventsFilters } from '../model/types';

function toDateRange(dateValue: string): {
  date_from?: string;
  date_to?: string;
} {
  if (!dateValue) {
    return {};
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return {};
  }

  const dateFrom = new Date(date);
  dateFrom.setHours(0, 0, 0, 0);

  const dateTo = new Date(date);
  dateTo.setHours(23, 59, 59, 999);

  return {
    date_from: dateFrom.toISOString(),
    date_to: dateTo.toISOString(),
  };
}

export function getPublicEventsQueryFilters(filters: PublicEventsFilters) {
  return {
    category: filters.category,
    format: filters.format,
    ...toDateRange(filters.date),
  };
}

export function hasPublicEventsFilters(filters: PublicEventsFilters): boolean {
  return Boolean(filters.category || filters.format || filters.date);
}

export function formatFilterDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
