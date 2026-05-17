import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseUrl) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    credentials: 'include',
  }),
  tagTypes: ['Auth', 'User', 'OrganizerRequests', 'Profile'],
  endpoints: () => ({}),
});
