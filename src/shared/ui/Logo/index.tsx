'use client';

import { SVGProps } from 'react';

import { selectCurrentUserRole } from '@/features/auth/model/selectors';
import { useAppSelector } from '@/shared/lib';
import { getRoleHomeRoute, routes } from '@/shared/model/routes';

import { LogoIcon } from '../Icons';
import * as S from './styled';

interface LogoProps extends SVGProps<SVGSVGElement> {
  showLabel?: boolean;
}

export default function Logo({ showLabel = true, ...props }: LogoProps) {
  const userRole = useAppSelector(selectCurrentUserRole);

  const href = userRole ? getRoleHomeRoute(userRole) : routes.home;

  return (
    <S.Wrapper href={href}>
      <S.IconWrapper>
        <LogoIcon {...props} />
      </S.IconWrapper>

      {showLabel && <S.Label>Planora</S.Label>}
    </S.Wrapper>
  );
}
