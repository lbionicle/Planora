import {
  EventAnalyticsDetail,
  EventAnalyticsListRequest,
  EventAnalyticsListResponse,
  SendEventRsvpResponse,
} from '@/entities/event/model/analyticsTypes';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

export const organizerAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizerAnalyticsEvents: builder.query<
      ApiSuccessResponse<EventAnalyticsListResponse>,
      EventAnalyticsListRequest
    >({
      query: ({ page, limit, search }) => ({
        url: '/organizer/analytics/events',
        method: 'GET',
        params: {
          page,
          limit,
          search: search || undefined,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'OrganizerAnalytics' as const, id: 'LIST' },
              ...result.data.items.map((event) => ({
                type: 'OrganizerAnalytics' as const,
                id: event.id,
              })),
            ]
          : [{ type: 'OrganizerAnalytics' as const, id: 'LIST' }],
    }),

    getOrganizerEventAnalytics: builder.query<
      ApiSuccessResponse<EventAnalyticsDetail>,
      string
    >({
      query: (eventId) => ({
        url: `/organizer/analytics/events/${eventId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, eventId) => [
        { type: 'OrganizerAnalytics' as const, id: eventId },
      ],
    }),

    sendOrganizerEventRsvp: builder.mutation<
      ApiSuccessResponse<SendEventRsvpResponse>,
      string
    >({
      query: (eventId) => ({
        url: `/organizer/analytics/events/${eventId}/rsvp/send`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, eventId) => [
        { type: 'OrganizerAnalytics' as const, id: eventId },
        { type: 'OrganizerAnalytics' as const, id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetOrganizerAnalyticsEventsQuery,
  useGetOrganizerEventAnalyticsQuery,
  useSendOrganizerEventRsvpMutation,
} = organizerAnalyticsApi;
