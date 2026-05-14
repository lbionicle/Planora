import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

import {
  AuthUserResponse,
  LoginRequest,
  RegisterParticipantRequest,
} from '../model/types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiSuccessResponse<AuthUserResponse>, LoginRequest>(
      {
        query: (body) => ({
          url: '/auth/login',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Auth', 'User'],
      },
    ),

    registerParticipant: builder.mutation<
      ApiSuccessResponse<AuthUserResponse>,
      RegisterParticipantRequest
    >({
      query: (body) => ({
        url: '/auth/register/participant',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    registerOrganizer: builder.mutation<
      ApiSuccessResponse<AuthUserResponse>,
      FormData
    >({
      query: (body) => ({
        url: '/auth/register/organizer',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    logout: builder.mutation<ApiSuccessResponse<null>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User'],
    }),

    getMe: builder.query<ApiSuccessResponse<AuthUserResponse>, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['Auth', 'User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterParticipantMutation,
  useRegisterOrganizerMutation,
  useLogoutMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;
