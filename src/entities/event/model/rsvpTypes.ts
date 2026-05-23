import { EventRegistrationStatus, EventRsvpStatus } from './registrationTypes';

export interface RsvpResponsePreview {
  registration_id: string;
  event_id: string;
  public_id: string;

  title: string;
  location: string;
  starts_at: string;
  ends_at: string;

  action: EventRsvpStatus;
  tickets_count: number;
  current_status: EventRegistrationStatus;
  current_rsvp_status: EventRsvpStatus | null;
}

export interface RsvpRespondRequest {
  token: string;
}

export interface RsvpRespondResponse {
  registration_id: string;
  event_id: string;
  public_id: string;

  status: EventRegistrationStatus;
  rsvp_status: EventRsvpStatus;
  rsvp_responded_at: string;
}
