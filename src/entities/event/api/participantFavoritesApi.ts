import { EventsListResponse } from '@/entities/event/model/types';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

interface FavoriteEventIdsResponse {
  event_ids: string[];
}

export const participantFavoritesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParticipantFavoriteEvents: builder.query<
      ApiSuccessResponse<EventsListResponse>,
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: '/participant/favorites',
        method: 'GET',
        params: { page, limit },
      }),
      providesTags: ['ParticipantFavorites'],
    }),

    getParticipantFavoriteEventIds: builder.query<
      ApiSuccessResponse<FavoriteEventIdsResponse>,
      void
    >({
      query: () => ({
        url: '/participant/favorites/ids',
        method: 'GET',
      }),
      providesTags: ['ParticipantFavorites'],
    }),

    addParticipantFavoriteEvent: builder.mutation<
      ApiSuccessResponse<null>,
      string
    >({
      query: (eventId) => ({
        url: `/participant/favorites/${eventId}`,
        method: 'POST',
      }),
      invalidatesTags: ['ParticipantFavorites'],
    }),

    removeParticipantFavoriteEvent: builder.mutation<
      ApiSuccessResponse<null>,
      string
    >({
      query: (eventId) => ({
        url: `/participant/favorites/${eventId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ParticipantFavorites'],
    }),
  }),
});

export const {
  useGetParticipantFavoriteEventsQuery,
  useGetParticipantFavoriteEventIdsQuery,
  useAddParticipantFavoriteEventMutation,
  useRemoveParticipantFavoriteEventMutation,
} = participantFavoritesApi;
