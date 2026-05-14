import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '@/entities/user/model/types';

import { authApi } from '../api/authApi';
import { AuthState } from './types';

const initialState: AuthState = {
  user: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isInitialized = true;
      })
      .addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.isInitialized = true;
      })
      .addMatcher(authApi.endpoints.getMe.matchRejected, (state) => {
        state.user = null;
        state.isInitialized = true;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isInitialized = true;
      });
  },
});

export const { setUser, setInitialized } = authSlice.actions;

export const authReducer = authSlice.reducer;
