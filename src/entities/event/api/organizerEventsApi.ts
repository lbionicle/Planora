import {
  EventCreateRequest,
  EventDetail,
  EventsListRequest,
  EventsListResponse,
  EventUpdateRequest,
} from '@/entities/event/model/types';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

export const organizerEventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizerEvents: builder.query<
      ApiSuccessResponse<EventsListResponse>,
      EventsListRequest
    >({
      query: ({
        page,
        limit,
        search,
        category,
        visibility,
        format,
        status,
      }) => ({
        url: '/organizer/events',
        method: 'GET',
        params: {
          page,
          limit,
          search: search || undefined,
          category: category || undefined,
          visibility: visibility || undefined,
          format: format || undefined,
          status: status || undefined,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'Events', id: 'ORGANIZER_LIST' },
              ...result.data.items.map((event) => ({
                type: 'Events' as const,
                id: event.id,
              })),
            ]
          : [{ type: 'Events', id: 'ORGANIZER_LIST' }],
    }),

    getOrganizerEvent: builder.query<ApiSuccessResponse<EventDetail>, string>({
      query: (eventId) => ({
        url: `/organizer/events/${eventId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, eventId) => [
        { type: 'Events', id: eventId },
      ],
    }),

    createOrganizerEvent: builder.mutation<
      ApiSuccessResponse<EventDetail>,
      EventCreateRequest
    >({
      query: (body) => ({
        url: '/organizer/events',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Events', id: 'ORGANIZER_LIST' }],
    }),

    updateOrganizerEvent: builder.mutation<
      ApiSuccessResponse<EventDetail>,
      { eventId: string; body: EventUpdateRequest }
    >({
      query: ({ eventId, body }) => ({
        url: `/organizer/events/${eventId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { eventId }) => [
        { type: 'Events', id: eventId },
        { type: 'Events', id: 'ORGANIZER_LIST' },
      ],
    }),

    deleteOrganizerEvent: builder.mutation<ApiSuccessResponse<null>, string>({
      query: (eventId) => ({
        url: `/organizer/events/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, eventId) => [
        { type: 'Events', id: eventId },
        { type: 'Events', id: 'ORGANIZER_LIST' },
      ],
    }),

    uploadOrganizerEventImage: builder.mutation<
      ApiSuccessResponse<EventDetail>,
      { eventId: string; image: File }
    >({
      query: ({ eventId, image }) => {
        const formData = new FormData();

        formData.append('image', image);

        return {
          url: `/organizer/events/${eventId}/image`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { eventId }) => [
        { type: 'Events', id: eventId },
        { type: 'Events', id: 'ORGANIZER_LIST' },
      ],
    }),

    deleteOrganizerEventImage: builder.mutation<
      ApiSuccessResponse<EventDetail>,
      string
    >({
      query: (eventId) => ({
        url: `/organizer/events/${eventId}/image`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, eventId) => [
        { type: 'Events', id: eventId },
        { type: 'Events', id: 'ORGANIZER_LIST' },
      ],
    }),
  }),
});

export const {
  useGetOrganizerEventsQuery,
  useGetOrganizerEventQuery,
  useCreateOrganizerEventMutation,
  useUpdateOrganizerEventMutation,
  useDeleteOrganizerEventMutation,
  useUploadOrganizerEventImageMutation,
  useDeleteOrganizerEventImageMutation,
} = organizerEventsApi;
