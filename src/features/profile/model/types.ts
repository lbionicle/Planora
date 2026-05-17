import { User } from '@/entities/user/model/types';

export interface ParticipantProfile {
  first_name: string;
  last_name: string;
}

export interface OrganizerProfile {
  company_name: string;
}

export interface CurrentUserProfile {
  user: User;
  participant_profile: ParticipantProfile | null;
  organizer_profile: OrganizerProfile | null;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  company_name?: string;
}

export interface UpdateAvatarResponse {
  user: User;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}
