import {
  ChangePasswordRequest,
  CurrentUserProfile,
  UpdateAvatarResponse,
  UpdateProfileRequest,
} from '@/features/profile/model/types';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentProfile: builder.query<
      ApiSuccessResponse<CurrentUserProfile>,
      void
    >({
      query: () => ({
        url: '/users/me/profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),

    updateCurrentProfile: builder.mutation<
      ApiSuccessResponse<CurrentUserProfile>,
      UpdateProfileRequest
    >({
      query: (body) => ({
        url: '/users/me/profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),

    uploadCurrentAvatar: builder.mutation<
      ApiSuccessResponse<UpdateAvatarResponse>,
      File
    >({
      query: (avatar) => {
        const formData = new FormData();

        formData.append('avatar', avatar);

        return {
          url: '/users/me/avatar',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Profile', 'Auth'],
    }),

    deleteCurrentAvatar: builder.mutation<
      ApiSuccessResponse<UpdateAvatarResponse>,
      void
    >({
      query: () => ({
        url: '/users/me/avatar',
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile', 'Auth'],
    }),

    changeCurrentPassword: builder.mutation<
      ApiSuccessResponse<null>,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: '/users/me/password',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetCurrentProfileQuery,
  useUpdateCurrentProfileMutation,
  useUploadCurrentAvatarMutation,
  useDeleteCurrentAvatarMutation,
  useChangeCurrentPasswordMutation,
} = profileApi;
