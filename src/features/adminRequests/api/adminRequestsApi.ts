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
      providesTags: ['OrganizerRequests'],
    }),

    approveOrganizerRequest: builder.mutation<ApiSuccessResponse<null>, string>(
      {
        query: (requestId) => ({
          url: `/admin/organizer-applications/${requestId}/approve`,
          method: 'PATCH',
        }),
        invalidatesTags: ['OrganizerRequests'],
      },
    ),

    rejectOrganizerRequest: builder.mutation<ApiSuccessResponse<null>, string>({
      query: (requestId) => ({
        url: `/admin/organizer-applications/${requestId}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: ['OrganizerRequests'],
    }),
  }),
});

export const {
  useGetOrganizerRequestsQuery,
  useApproveOrganizerRequestMutation,
  useRejectOrganizerRequestMutation,
} = adminRequestsApi;
