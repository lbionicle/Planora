import {
  AdminUpdateUserRequest,
  AdminUpdateUserStatusRequest,
  AdminUserDetail,
  AdminUsersListRequest,
  AdminUsersListResponse,
} from '@/entities/adminUser/model/types';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

export const adminUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<
      ApiSuccessResponse<AdminUsersListResponse>,
      AdminUsersListRequest
    >({
      query: ({ page, limit, search, role, status }) => ({
        url: '/admin/users',
        method: 'GET',
        params: {
          page,
          limit,
          search: search || undefined,
          role: role || undefined,
          status: status || undefined,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'AdminUsers', id: 'LIST' },
              ...result.data.items.map((user) => ({
                type: 'AdminUsers' as const,
                id: user.id,
              })),
            ]
          : [{ type: 'AdminUsers', id: 'LIST' }],
    }),

    getAdminUser: builder.query<ApiSuccessResponse<AdminUserDetail>, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, userId) => [
        { type: 'AdminUsers', id: userId },
      ],
    }),

    updateAdminUser: builder.mutation<
      ApiSuccessResponse<AdminUserDetail>,
      { userId: string; body: AdminUpdateUserRequest }
    >({
      query: ({ userId, body }) => ({
        url: `/admin/users/${userId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'AdminUsers', id: userId },
        { type: 'AdminUsers', id: 'LIST' },
      ],
    }),

    updateAdminUserStatus: builder.mutation<
      ApiSuccessResponse<AdminUserDetail>,
      AdminUpdateUserStatusRequest
    >({
      query: ({ userId, status }) => ({
        url: `/admin/users/${userId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'AdminUsers', id: userId },
        { type: 'AdminUsers', id: 'LIST' },
      ],
    }),

    deleteAdminUser: builder.mutation<ApiSuccessResponse<null>, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, userId) => [
        { type: 'AdminUsers', id: userId },
        { type: 'AdminUsers', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAdminUsersQuery,
  useGetAdminUserQuery,
  useUpdateAdminUserMutation,
  useUpdateAdminUserStatusMutation,
  useDeleteAdminUserMutation,
} = adminUsersApi;
