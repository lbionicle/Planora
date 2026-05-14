import { User, UserRole } from '@/entities/user/model/types';

export type SignUpMode = UserRole.PARTICIPANT | UserRole.ORGANIZER;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterParticipantRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface AuthUserResponse {
  user: User;
}

export interface AuthState {
  user: User | null;
  isInitialized: boolean;
}
