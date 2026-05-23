import {
  AdminGeneralAnalytics,
  AdminGeneralAnalyticsRequest,
  EventAnalyticsDetail,
  EventAnalyticsListRequest,
  EventAnalyticsListResponse,
} from '@/entities/event/model/analyticsTypes';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';
import { downloadFile } from '@/shared/lib/downloadFile';

interface AdminGeneralAnalyticsReportRequest extends AdminGeneralAnalyticsRequest {
  filename: string;
}

interface AdminEventAnalyticsReportRequest {
  eventId: string;
  filename: string;
}

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

    exportAdminGeneralAnalyticsReport: builder.mutation<
      ApiSuccessResponse<null>,
      AdminGeneralAnalyticsReportRequest
    >({
      async queryFn(params, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: '/admin/analytics/general/report',
          method: 'GET',
          params: {
            date_from: params.date_from || undefined,
            date_to: params.date_to || undefined,
          },
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

        downloadFile(result.data, params.filename);

        return {
          data: {
            success: true,
            message: 'Отчёт успешно экспортирован.',
            data: null,
          },
        };
      },
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

    exportAdminEventAnalyticsReport: builder.mutation<
      ApiSuccessResponse<null>,
      AdminEventAnalyticsReportRequest
    >({
      async queryFn({ eventId, filename }, _api, _extraOptions, baseQuery) {
        const result = await baseQuery({
          url: `/admin/analytics/events/${eventId}/report`,
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

    deleteAdminAnalyticsEvent: builder.mutation<
      ApiSuccessResponse<null>,
      string
    >({
      query: (eventId) => ({
        url: `/admin/events/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, eventId) => [
        { type: 'AdminAnalytics' as const, id: 'GENERAL' },
        { type: 'AdminAnalytics' as const, id: 'EVENTS' },
        { type: 'AdminAnalytics' as const, id: eventId },
      ],
    }),
  }),
});

export const {
  useGetAdminGeneralAnalyticsQuery,
  useExportAdminGeneralAnalyticsReportMutation,
  useGetAdminAnalyticsEventsQuery,
  useGetAdminEventAnalyticsQuery,
  useExportAdminEventAnalyticsReportMutation,
  useDeleteAdminAnalyticsEventMutation,
} = adminAnalyticsApi;
