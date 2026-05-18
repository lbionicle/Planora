import { EventCategory, EventFormat } from '@/entities/event/model/types';

export interface PublicEventsFilters {
  category: EventCategory | null;
  format: EventFormat | null;
  date: string;
}
