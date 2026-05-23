import {
  EventAnalyticsDetail,
  EventAnalyticsListRequest,
  EventAnalyticsListResponse,
  SendEventRsvpResponse,
} from '@/entities/event/model/analyticsTypes';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';
import { downloadFile } from '@/shared/lib/downloadFile';

interface OrganizerEventAnalyticsReportRequest {
  eventId: string;
  filename: string;
}

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
              { type: 'OrganizerAnalytics' as const, id: 'EVENTS' },
              ...result.data.items.map((event) => ({
                type: 'OrganizerAnalytics' as const,
                id: event.id,
              })),
            ]
          : [{ type: 'OrganizerAnalytics' as const, id: 'EVENTS' }],
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
        { type: 'OrganizerAnalytics' as const, id: 'EVENTS' },
        { type: 'OrganizerAnalytics' as const, id: eventId },
      ],
    }),

    exportOrganizerEventAnalyticsReport: builder.mutation<
      ApiSuccessResponse<null>,
      OrganizerEventAnalyticsReportRequest
    >({
      async queryFn({ eventId, filename }, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `/organizer/analytics/events/${eventId}/report`,
          method: 'GET',
          responseHandler: (response) => response.blob(),
          cache: 'no-cache',
        });

        if (result.error) {
          return { error: result.error };
        }

        if (!(result.data instanceof Blob)) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error: 'Не удалось получить файл отчёта.',
            },
          };
        }

        downloadFile(result.data, filename);

        return {
          data: {
            success: true,
            message: 'Отчёт успешно экспортирован.',
            data: null,
          },
        };
      },
    }),
  }),
});

export const {
  useGetOrganizerAnalyticsEventsQuery,
  useGetOrganizerEventAnalyticsQuery,
  useSendOrganizerEventRsvpMutation,
  useExportOrganizerEventAnalyticsReportMutation,
} = organizerAnalyticsApi;
