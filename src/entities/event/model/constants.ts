import {
  EventCategory,
  EventFilters,
  EventFormat,
  EventStatus,
  EventVisibility,
} from './types';

export const DEFAULT_EVENT_FILTERS: EventFilters = {
  category: null,
  visibility: null,
  format: null,
  status: null,
};

export const eventCategoryLabels: Record<EventCategory, string> = {
  [EventCategory.BUSINESS]: 'Бизнес',
  [EventCategory.EDUCATION]: 'Обучение',
  [EventCategory.TEAM_BUILDING]: 'Тимбилдинг',
  [EventCategory.HOLIDAY]: 'Праздник',
  [EventCategory.HR]: 'HR',
  [EventCategory.CLIENT_PARTNER]: 'Клиенты и партнёры',
};

export const eventVisibilityLabels: Record<EventVisibility, string> = {
  [EventVisibility.PUBLIC]: 'Открытое',
  [EventVisibility.LINK_ONLY]: 'Закрытое',
};

export const eventFormatLabels: Record<EventFormat, string> = {
  [EventFormat.OFFLINE]: 'Оффлайн',
  [EventFormat.ONLINE]: 'Онлайн',
};

export const eventStatusLabels: Record<EventStatus, string> = {
  [EventStatus.DRAFT]: 'Черновик',
  [EventStatus.PUBLISHED]: 'Опубликовано',
  [EventStatus.COMPLETED]: 'Завершено',
  [EventStatus.CANCELLED]: 'Отменено',
};
