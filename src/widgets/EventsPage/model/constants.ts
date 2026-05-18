import {
  eventCategoryLabels,
  eventFormatLabels,
} from '@/entities/event/model/constants';

import { PublicEventsFilters } from './types';

export const DEFAULT_PUBLIC_EVENTS_FILTERS: PublicEventsFilters = {
  category: null,
  format: null,
  date: '',
};

export const publicEventCategoryOptions = Object.entries(
  eventCategoryLabels,
).map(([value, label]) => ({
  value,
  label,
}));

export const publicEventFormatOptions = Object.entries(eventFormatLabels).map(
  ([value, label]) => ({
    value,
    label,
  }),
);
