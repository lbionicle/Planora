import { RootState } from '@/shared/lib';

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.user);

export const selectIsAuthInitialized = (state: RootState) =>
  state.auth.isInitialized;
