import { EventFormat, EventStatus } from './types';

export interface AnalyticsDatePoint {
  date: string;
  value: number;
}

export interface EventAnalyticsListItem {
  id: string;
  public_id: string;

  organizer_id: string;
  organizer_name: string;

  title: string;
  format: EventFormat;
  status: EventStatus;

  starts_at: string;
  ends_at: string;
  location: string;

  tickets_count: number;
  registrations_count: number;
  registered_tickets_count: number;
  available_tickets_count: number;
  occupancy_percent: number;

  rsvp_waiting_count: number;
  rsvp_accepted_count: number;
  rsvp_declined_count: number;

  created_at: string;
}

export interface EventAnalyticsListResponse {
  items: EventAnalyticsListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface EventAnalyticsDetail extends EventAnalyticsListItem {
  registrations_by_day: AnalyticsDatePoint[];
}

export interface EventAnalyticsListRequest {
  page: number;
  limit: number;
  search?: string;
}

export interface SendEventRsvpResponse {
  sent_count: number;
}

export interface AdminGeneralAnalytics {
  period_start: string;
  period_end: string;

  organizers_count: number;
  participants_count: number;
  events_count: number;
  registrations_count: number;
  registered_tickets_count: number;

  rsvp_waiting_count: number;
  rsvp_accepted_count: number;
  rsvp_declined_count: number;

  organizers_growth_percent: number;
  participants_growth_percent: number;
  events_growth_percent: number;
  registrations_growth_percent: number;
  rsvp_response_growth_percent: number;

  organizers_by_day: AnalyticsDatePoint[];
  participants_by_day: AnalyticsDatePoint[];
  events_by_day: AnalyticsDatePoint[];
  registrations_by_day: AnalyticsDatePoint[];
}

export interface AdminGeneralAnalyticsRequest {
  date_from?: string;
  date_to?: string;
}
