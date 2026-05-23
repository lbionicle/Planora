'use client';

import { PropsWithChildren, ReactNode } from 'react';

import Breadcrumbs, { BreadcrumbItem } from '@/shared/ui/Breadcrumbs';

import * as S from './styled';

interface PageLayoutProps extends PropsWithChildren {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  toolbar?: ReactNode;
  headerRight?: ReactNode;
}

export default function PageLayout({
  title,
  breadcrumbs,
  toolbar,
  headerRight,
  children,
}: PageLayoutProps): ReactNode {
  return (
    <S.Page>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

      {(title || headerRight) && (
        <S.Header>
          {title && <S.Title>{title}</S.Title>}
          {headerRight && <S.HeaderRight>{headerRight}</S.HeaderRight>}
        </S.Header>
      )}

      {toolbar}

      {children}
    </S.Page>
  );
}
