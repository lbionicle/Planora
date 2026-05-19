import { EventFormat } from './types';

export enum EventRegistrationStatus {
  REGISTERED = 'REGISTERED',
  CANCELLED = 'CANCELLED',
}

export enum EventRsvpStatus {
  WAITING_RESPONSE = 'WAITING_RESPONSE',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export interface EventRegistrationCreateRequest {
  tickets_count: number;
}

export interface EventTicket {
  id: string;
  event_id: string;
  public_id: string;

  title: string;
  image_url: string | null;
  organizer_email: string;

  format: EventFormat;
  location: string;
  online_url: string | null;

  starts_at: string;
  ends_at: string;

  tickets_count: number;
  status: EventRegistrationStatus;
  rsvp_status: EventRsvpStatus | null;

  created_at: string;
}

export interface EventRegistrationStateResponse {
  registration: EventTicket | null;
}

export interface EventTicketsListResponse {
  items: EventTicket[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface ParticipantTicketsRequest {
  page: number;
  limit: number;
  search?: string;
}
