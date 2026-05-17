import {
  EventCategory,
  EventCreateRequest,
  EventDetail,
  EventFormat,
  EventStatus,
  EventVisibility,
} from '@/entities/event/model/types';
import { EventFormValues } from '@/features/organizerEvents/model/schemas';

export const DEFAULT_EVENT_FORM_VALUES: EventFormValues = {
  title: '',
  description: '',
  category: EventCategory.BUSINESS,
  visibility: EventVisibility.PUBLIC,
  format: EventFormat.OFFLINE,
  status: EventStatus.PUBLISHED,
  tickets_count: '',
  starts_at: '',
  ends_at: '',
  country: '',
  region: '',
  city: '',
  postal_code: '',
  address: '',
  online_url: '',
};

function formatDateTimeLocal(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

function getIsoDateTime(value: string): string {
  return new Date(value).toISOString();
}

function getNullableText(value: string): string | null {
  const trimmedValue = value.trim();

  return trimmedValue || null;
}

export function getEventFormValues(event?: EventDetail): EventFormValues {
  if (!event) {
    return DEFAULT_EVENT_FORM_VALUES;
  }

  return {
    title: event.title,
    description: event.description,
    category: event.category,
    visibility: event.visibility,
    format: event.format,
    status: event.status,
    tickets_count: String(event.tickets_count),
    starts_at: formatDateTimeLocal(event.starts_at),
    ends_at: formatDateTimeLocal(event.ends_at),
    country: event.country ?? '',
    region: event.region ?? '',
    city: event.city ?? '',
    postal_code: event.postal_code ?? '',
    address: event.address ?? '',
    online_url: event.online_url ?? '',
  };
}

export function getEventPayload(values: EventFormValues): EventCreateRequest {
  const isOnline = values.format === EventFormat.ONLINE;

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    category: values.category,
    visibility: values.visibility,
    format: values.format,
    status: values.status,
    tickets_count: Number(values.tickets_count),
    starts_at: getIsoDateTime(values.starts_at),
    ends_at: getIsoDateTime(values.ends_at),
    country: isOnline ? null : getNullableText(values.country),
    region: isOnline ? null : getNullableText(values.region),
    city: isOnline ? null : getNullableText(values.city),
    postal_code: isOnline ? null : getNullableText(values.postal_code),
    address: isOnline ? null : getNullableText(values.address),
    online_url: isOnline ? getNullableText(values.online_url) : null,
  };
}
