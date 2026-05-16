import { UserRole, UserStatus } from '@/entities/user/model/types';
import { RootState } from '@/shared/lib';

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectCurrentUserId = (state: RootState) => state.auth.user?.id;

export const selectCurrentUserEmail = (state: RootState) =>
  state.auth.user?.email;

export const selectCurrentUserRole = (state: RootState) =>
  state.auth.user?.role;

export const selectCurrentUserStatus = (state: RootState) =>
  state.auth.user?.status;

export const selectCurrentUserAvatarUrl = (state: RootState) =>
  state.auth.user?.avatar_url ?? null;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.user);

export const selectIsAuthInitialized = (state: RootState) =>
  state.auth.isInitialized;

export const selectIsParticipant = (state: RootState) =>
  state.auth.user?.role === UserRole.PARTICIPANT;

export const selectIsOrganizer = (state: RootState) =>
  state.auth.user?.role === UserRole.ORGANIZER;

export const selectIsAdmin = (state: RootState) =>
  state.auth.user?.role === UserRole.ADMIN;

export const selectIsActiveUser = (state: RootState) =>
  state.auth.user?.status === UserStatus.ACTIVE;
