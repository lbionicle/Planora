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

      serializeQueryArgs: ({ endpointName, queryArgs }) => ({
        endpointName,
        limit: queryArgs.limit,
        search: queryArgs.search || '',
        category: queryArgs.category || null,
        format: queryArgs.format || null,
        date_from: queryArgs.date_from || '',
        date_to: queryArgs.date_to || '',
      }),

      merge: (currentCache, newResponse, { arg }) => {
        if (arg.page === 1) {
          currentCache.success = newResponse.success;
          currentCache.message = newResponse.message;
          currentCache.data = newResponse.data;
          return;
        }

        const existingIds = new Set(
          currentCache.data.items.map((event) => event.id),
        );

        const newItems = newResponse.data.items.filter(
          (event) => !existingIds.has(event.id),
        );

        currentCache.data.items.push(...newItems);
        currentCache.data.pagination = newResponse.data.pagination;
        currentCache.message = newResponse.message;
        currentCache.success = newResponse.success;
      },

      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page ||
        currentArg?.limit !== previousArg?.limit ||
        currentArg?.search !== previousArg?.search ||
        currentArg?.category !== previousArg?.category ||
        currentArg?.format !== previousArg?.format ||
        currentArg?.date_from !== previousArg?.date_from ||
        currentArg?.date_to !== previousArg?.date_to,

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
