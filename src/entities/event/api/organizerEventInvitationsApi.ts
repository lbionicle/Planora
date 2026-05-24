import { baseApi } from '@/shared/api/baseApi';
import { ApiSuccessResponse } from '@/shared/api/types';

interface SendOrganizerEventInvitationRequest {
  eventId: string;
  email: string;
}

interface SendOrganizerEventInvitationResponse {
  sent: boolean;
}

export const organizerEventInvitationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOrganizerEventInvitation: builder.mutation<
      ApiSuccessResponse<SendOrganizerEventInvitationResponse>,
      SendOrganizerEventInvitationRequest
    >({
      query: ({ eventId, email }) => ({
        url: `/organizer/events/${eventId}/invitations`,
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
  }),
});

export const { useSendOrganizerEventInvitationMutation } =
  organizerEventInvitationsApi;
