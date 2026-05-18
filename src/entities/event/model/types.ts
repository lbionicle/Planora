export enum EventCategory {
  BUSINESS = 'BUSINESS',
  EDUCATION = 'EDUCATION',
  TEAM_BUILDING = 'TEAM_BUILDING',
  HOLIDAY = 'HOLIDAY',
  HR = 'HR',
  CLIENT_PARTNER = 'CLIENT_PARTNER',
}

export enum EventVisibility {
  PUBLIC = 'PUBLIC',
  LINK_ONLY = 'LINK_ONLY',
}

export enum EventFormat {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface EventListItem {
  id: string;
  public_id: string;
  title: string;
  category: EventCategory;
  visibility: EventVisibility;
  format: EventFormat;
  status: EventStatus;
  image_url: string | null;
  is_free: boolean;
  price: string | null;
  tickets_count: number;
  starts_at: string;
  ends_at: string;
  location: string;
  created_at: string;
}

export interface EventDetail extends EventListItem {
  organizer_id: string;
  organizer_name: string;
  description: string;
  country: string | null;
  region: string | null;
  city: string | null;
  postal_code: string | null;
  address: string | null;
  online_url: string | null;
  updated_at: string;
}

export interface EventsListResponse {
  items: EventListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface PublicEventsListRequest {
  page: number;
  limit: number;
  search?: string;
  category?: EventCategory | null;
  format?: EventFormat | null;
  date_from?: string;
  date_to?: string;
}

export interface EventsListRequest {
  page: number;
  limit: number;
  search?: string;
  category?: EventCategory;
  visibility?: EventVisibility;
  format?: EventFormat;
  status?: EventStatus;
  date_from?: string;
  date_to?: string;
}

export interface EventCreateRequest {
  title: string;
  description: string;
  category: EventCategory;
  visibility: EventVisibility;
  format: EventFormat;
  status: EventStatus;
  tickets_count: number;
  starts_at: string;
  ends_at: string;
  country: string | null;
  region: string | null;
  city: string | null;
  postal_code: string | null;
  address: string | null;
  online_url: string | null;
}

export type EventUpdateRequest = Partial<EventCreateRequest>;

export interface EventFilters {
  category: EventCategory | null;
  visibility: EventVisibility | null;
  format: EventFormat | null;
  status: EventStatus | null;
}
