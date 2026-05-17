'use client';

import { usePathname } from 'next/navigation';

import { selectCurrentUserRole } from '@/features/auth/model/selectors';
import { useAppSelector } from '@/shared/lib';

import { getNavigationItems, isActivePath } from './config';
import * as S from './styled';

export default function WorkspaceNavigation() {
  const pathname = usePathname();

  const userRole = useAppSelector(selectCurrentUserRole);

  const navigationItems = getNavigationItems(userRole);

  if (navigationItems.length === 0) {
    return null;
  }

  return (
    <S.Navigation>
      {navigationItems.map(({ href, Icon, ActiveIcon, label }) => {
        const isActive = isActivePath(pathname, href);
        const NavigationIcon = isActive ? ActiveIcon : Icon;

        return (
          <S.NavigationLink key={href} href={href} $isActive={isActive}>
            <S.NavigationIcon>
              <NavigationIcon />
            </S.NavigationIcon>
            <span>{label}</span>
          </S.NavigationLink>
        );
      })}
    </S.Navigation>
  );
}
