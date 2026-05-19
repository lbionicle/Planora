import {
  EventRegistrationCreateRequest,
  EventRegistrationStateResponse,
  EventTicket,
  EventTicketsListResponse,
  ParticipantTicketsRequest,
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
        { type: 'ParticipantRegistrations', id: 'LIST' },
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
      ParticipantTicketsRequest
    >({
      query: ({ page, limit, search }) => ({
        url: '/participant/tickets',
        method: 'GET',
        params: {
          page,
          limit,
          search: search || undefined,
        },
      }),

      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        limit: queryArgs.limit,
        search: queryArgs.search ?? '',
      }),

      merge: (currentCache, newResponse, { arg }) => {
        if (arg.page === 1) {
          currentCache.data = newResponse.data;
          currentCache.message = newResponse.message;
          currentCache.success = newResponse.success;
          return;
        }

        const existingIds = new Set(
          currentCache.data.items.map((ticket) => ticket.id),
        );

        const newItems = newResponse.data.items.filter(
          (ticket) => !existingIds.has(ticket.id),
        );

        currentCache.data.items.push(...newItems);
        currentCache.data.pagination = newResponse.data.pagination;
        currentCache.message = newResponse.message;
        currentCache.success = newResponse.success;
      },

      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page ||
        currentArg?.limit !== previousArg?.limit ||
        currentArg?.search !== previousArg?.search,

      providesTags: (result) =>
        result
          ? [
              { type: 'ParticipantRegistrations', id: 'LIST' },
              ...result.data.items.map((ticket) => ({
                type: 'ParticipantRegistrations' as const,
                id: ticket.id,
              })),
            ]
          : [{ type: 'ParticipantRegistrations', id: 'LIST' }],
    }),

    cancelParticipantTicket: builder.mutation<
      ApiSuccessResponse<EventTicket>,
      string
    >({
      query: (registrationId) => ({
        url: `/participant/tickets/${registrationId}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, registrationId) => [
        { type: 'ParticipantRegistrations', id: registrationId },
        { type: 'ParticipantRegistrations', id: 'LIST' },
        'PublicEvents',
      ],
    }),
  }),
});

export const {
  useCreateParticipantEventRegistrationMutation,
  useGetParticipantEventRegistrationQuery,
  useGetParticipantTicketsQuery,
  useCancelParticipantTicketMutation,
} = participantRegistrationsApi;
