import { OrganizerRequestsList } from '@/entities/organizerRequest/model/types';
import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

export interface GetOrganizerRequestsParams {
  page: number;
  limit: number;
  search?: string;
}

export const adminRequestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizerRequests: builder.query<
      ApiSuccessResponse<OrganizerRequestsList>,
      GetOrganizerRequestsParams
    >({
      query: ({ page, limit, search }) => ({
        url: '/admin/organizer-applications',
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
              { type: 'OrganizerRequests', id: 'LIST' },
              ...result.data.items.map((request) => ({
                type: 'OrganizerRequests' as const,
                id: request.id,
              })),
            ]
          : [{ type: 'OrganizerRequests', id: 'LIST' }],
    }),

    approveOrganizerRequest: builder.mutation<ApiSuccessResponse<null>, string>(
      {
        query: (requestId) => ({
          url: `/admin/organizer-applications/${requestId}/approve`,
          method: 'PATCH',
        }),
        invalidatesTags: (_result, _error, requestId) => [
          { type: 'OrganizerRequests', id: requestId },
          { type: 'OrganizerRequests', id: 'LIST' },
          { type: 'AdminUsers', id: requestId },
          { type: 'AdminUsers', id: 'LIST' },
        ],
      },
    ),

    rejectOrganizerRequest: builder.mutation<ApiSuccessResponse<null>, string>({
      query: (requestId) => ({
        url: `/admin/organizer-applications/${requestId}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, requestId) => [
        { type: 'OrganizerRequests', id: requestId },
        { type: 'OrganizerRequests', id: 'LIST' },
        { type: 'AdminUsers', id: requestId },
        { type: 'AdminUsers', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetOrganizerRequestsQuery,
  useApproveOrganizerRequestMutation,
  useRejectOrganizerRequestMutation,
} = adminRequestsApi;
