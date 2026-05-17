'use client';

import { PropsWithChildren, ReactNode } from 'react';

import AuthBootstrap from '@/features/auth/ui/AuthBootstrap';

import WorkspaceFooter from '../WorkspaceFooter';
import WorkspaceHeader from '../WorkspaceHeader';
import * as S from './styled';

export default function WorkspaceLayout({
  children,
}: PropsWithChildren): ReactNode {
  return (
    <S.Layout>
      <AuthBootstrap />

      <WorkspaceHeader />

      <S.Main>{children}</S.Main>

      <WorkspaceFooter />
    </S.Layout>
  );
}
