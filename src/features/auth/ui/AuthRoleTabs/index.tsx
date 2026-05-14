'use client';

import { HTMLAttributes } from 'react';

import { UserRole } from '@/entities/user/model/types';
import { SignUpMode } from '@/features/auth/model/types';

import * as S from './styled';

interface AuthRoleTabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> {
  value: SignUpMode;
  onChange: (value: SignUpMode) => void;
}

export default function AuthRoleTabs({
  value,
  onChange,
  ...props
}: AuthRoleTabsProps) {
  return (
    <S.Wrapper {...props}>
      <S.Button
        $isActive={value === UserRole.PARTICIPANT}
        type="button"
        onClick={() => onChange(UserRole.PARTICIPANT)}
      >
        Участник
      </S.Button>

      <S.Button
        $isActive={value === UserRole.ORGANIZER}
        type="button"
        onClick={() => onChange(UserRole.ORGANIZER)}
      >
        Организатор
      </S.Button>
    </S.Wrapper>
  );
}
