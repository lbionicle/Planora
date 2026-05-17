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
        invalidatesTags: [
          { type: 'Auth', id: 'ME' },
          { type: 'User', id: 'CURRENT' },
          { type: 'Profile', id: 'CURRENT' },
        ],
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
      invalidatesTags: [{ type: 'AdminUsers', id: 'LIST' }],
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
      invalidatesTags: [
        { type: 'AdminUsers', id: 'LIST' },
        { type: 'OrganizerRequests', id: 'LIST' },
      ],
    }),

    logout: builder.mutation<ApiSuccessResponse<null>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: [
        { type: 'Auth', id: 'ME' },
        { type: 'User', id: 'CURRENT' },
        { type: 'Profile', id: 'CURRENT' },
        { type: 'AdminUsers', id: 'LIST' },
        { type: 'OrganizerRequests', id: 'LIST' },
      ],
    }),

    getMe: builder.query<ApiSuccessResponse<AuthUserResponse>, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: [
        { type: 'Auth', id: 'ME' },
        { type: 'User', id: 'CURRENT' },
      ],
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
