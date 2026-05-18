import {
  EventDetail,
  EventsListResponse,
  PublicEventsListRequest,
} from '@/entities/event/model/types';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

export const publicEventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicEvents: builder.query<
      ApiSuccessResponse<EventsListResponse>,
      PublicEventsListRequest
    >({
      query: ({
        page,
        limit,
        search,
        category,
        format,
        date_from,
        date_to,
      }) => ({
        url: '/events',
        method: 'GET',
        params: {
          page,
          limit,
          search: search || undefined,
          category: category || undefined,
          format: format || undefined,
          date_from: date_from || undefined,
          date_to: date_to || undefined,
        },
      }),
      providesTags: ['PublicEvents'],
    }),

    getPublicEvent: builder.query<ApiSuccessResponse<EventDetail>, string>({
      query: (publicId) => ({
        url: `/events/${publicId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, publicId) => [
        { type: 'PublicEvents', id: publicId },
      ],
    }),
  }),
});

export const { useGetPublicEventsQuery, useGetPublicEventQuery } =
  publicEventsApi;
