'use client';

import { ReactNode } from 'react';

import { LogoutIcon, UsersIcon } from '@/shared/ui/Icons';

import * as S from './styled';

interface WorkspaceUserMenuProps {
  isLogoutLoading: boolean;
  onProfileClick: () => void;
  onLogoutClick: () => void;
}

export default function WorkspaceUserMenu({
  isLogoutLoading,
  onProfileClick,
  onLogoutClick,
}: WorkspaceUserMenuProps): ReactNode {
  return (
    <S.Menu>
      <S.MenuItem type="button" onClick={onProfileClick}>
        <S.Icon>
          <UsersIcon />
        </S.Icon>

        <S.Text>Профиль</S.Text>
      </S.MenuItem>

      <S.MenuItem
        type="button"
        disabled={isLogoutLoading}
        onClick={onLogoutClick}
      >
        <S.Icon>
          <LogoutIcon />
        </S.Icon>

        <S.Text>Выйти</S.Text>
      </S.MenuItem>
    </S.Menu>
  );
}
