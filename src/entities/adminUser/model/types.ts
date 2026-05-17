import { User, UserRole, UserStatus } from '@/entities/user/model/types';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar_url: string | null;
  created_at: string;
}

export interface AdminParticipantProfile {
  first_name: string;
  last_name: string;
}

export interface AdminOrganizerProfile {
  company_name: string;
}

export interface AdminUserDetail {
  user: User;
  name: string;
  participant_profile: AdminParticipantProfile | null;
  organizer_profile: AdminOrganizerProfile | null;
}

export interface AdminUsersFilters {
  role: UserRole | null;
  status: UserStatus | null;
}

export interface AdminUsersListRequest {
  page: number;
  limit: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface AdminUsersListResponse {
  items: AdminUser[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface AdminUpdateUserRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
}

export interface AdminUpdateUserStatusRequest {
  userId: string;
  status: UserStatus;
}
