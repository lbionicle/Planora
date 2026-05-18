import {
  EventRegistrationCreateRequest,
  EventRegistrationStateResponse,
  EventTicket,
  EventTicketsListResponse,
} from '@/entities/event/model/registrationTypes';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

export const participantRegistrationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParticipantEventRegistration: builder.mutation<
      ApiSuccessResponse<EventTicket>,
      { eventId: string; body: EventRegistrationCreateRequest }
    >({
      query: ({ eventId, body }) => ({
        url: `/participant/events/${eventId}/registrations`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { eventId }) => [
        { type: 'ParticipantRegistrations', id: eventId },
        'ParticipantRegistrations',
        'PublicEvents',
      ],
    }),

    getParticipantEventRegistration: builder.query<
      ApiSuccessResponse<EventRegistrationStateResponse>,
      string
    >({
      query: (eventId) => ({
        url: `/participant/events/${eventId}/registration`,
        method: 'GET',
      }),
      providesTags: (_result, _error, eventId) => [
        { type: 'ParticipantRegistrations', id: eventId },
      ],
    }),

    getParticipantTickets: builder.query<
      ApiSuccessResponse<EventTicketsListResponse>,
      void
    >({
      query: () => ({
        url: '/participant/tickets',
        method: 'GET',
      }),
      providesTags: ['ParticipantRegistrations'],
    }),

    cancelParticipantTicket: builder.mutation<
      ApiSuccessResponse<EventTicket>,
      string
    >({
      query: (registrationId) => ({
        url: `/participant/tickets/${registrationId}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['ParticipantRegistrations', 'PublicEvents'],
    }),
  }),
});

export const {
  useCreateParticipantEventRegistrationMutation,
  useGetParticipantEventRegistrationQuery,
  useGetParticipantTicketsQuery,
  useCancelParticipantTicketMutation,
} = participantRegistrationsApi;
