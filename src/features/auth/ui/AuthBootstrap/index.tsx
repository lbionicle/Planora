'use client';

import { ReactNode } from 'react';

import { useGetMeQuery } from '@/features/auth/api/authApi';

export default function AuthBootstrap(): ReactNode {
  useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return null;
}
