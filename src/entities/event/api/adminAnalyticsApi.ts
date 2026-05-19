import {
  AdminGeneralAnalytics,
  AdminGeneralAnalyticsRequest,
  EventAnalyticsDetail,
  EventAnalyticsListRequest,
  EventAnalyticsListResponse,
} from '@/entities/event/model/analyticsTypes';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

export const adminAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminGeneralAnalytics: builder.query<
      ApiSuccessResponse<AdminGeneralAnalytics>,
      AdminGeneralAnalyticsRequest | void
    >({
      query: (params) => ({
        url: '/admin/analytics/general',
        method: 'GET',
        params: {
          date_from: params?.date_from || undefined,
          date_to: params?.date_to || undefined,
        },
      }),
      providesTags: [{ type: 'AdminAnalytics' as const, id: 'GENERAL' }],
    }),

    getAdminAnalyticsEvents: builder.query<
      ApiSuccessResponse<EventAnalyticsListResponse>,
      EventAnalyticsListRequest
    >({
      query: ({ page, limit, search }) => ({
        url: '/admin/analytics/events',
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
              { type: 'AdminAnalytics' as const, id: 'EVENTS' },
              ...result.data.items.map((event) => ({
                type: 'AdminAnalytics' as const,
                id: event.id,
              })),
            ]
          : [{ type: 'AdminAnalytics' as const, id: 'EVENTS' }],
    }),

    getAdminEventAnalytics: builder.query<
      ApiSuccessResponse<EventAnalyticsDetail>,
      string
    >({
      query: (eventId) => ({
        url: `/admin/analytics/events/${eventId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, eventId) => [
        { type: 'AdminAnalytics' as const, id: eventId },
      ],
    }),
  }),
});

export const {
  useGetAdminGeneralAnalyticsQuery,
  useGetAdminAnalyticsEventsQuery,
  useGetAdminEventAnalyticsQuery,
} = adminAnalyticsApi;
