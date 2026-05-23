import {
  RsvpRespondRequest,
  RsvpRespondResponse,
  RsvpResponsePreview,
} from '@/entities/event/model/rsvpTypes';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

export const rsvpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRsvpPreview: builder.query<
      ApiSuccessResponse<RsvpResponsePreview>,
      string
    >({
      query: (token) => ({
        url: '/rsvp/preview',
        method: 'GET',
        params: {
          token,
        },
      }),
    }),

    respondToRsvp: builder.mutation<
      ApiSuccessResponse<RsvpRespondResponse>,
      RsvpRespondRequest
    >({
      query: (payload) => ({
        url: '/rsvp/respond',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useGetRsvpPreviewQuery, useRespondToRsvpMutation } = rsvpApi;
