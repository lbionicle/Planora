'use client';

import { ReactNode } from 'react';

import Divider from '@/shared/ui/Divider';
import Logo from '@/shared/ui/Logo';

import WorkspaceNavigation from '../WorkspaceNavigation';
import WorkspaceUserBlock from '../WorkspaceUserBlock';
import * as S from './styled';

export default function WorkspaceHeader(): ReactNode {
  return (
    <S.Header>
      <S.Inner>
        <Logo />

        <S.RightSide>
          <WorkspaceNavigation />

          <Divider orientation="vertical" />

          <WorkspaceUserBlock />
        </S.RightSide>
      </S.Inner>
    </S.Header>
  );
}
