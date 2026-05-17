'use client';

import { PropsWithChildren, ReactNode } from 'react';

import Breadcrumbs, { BreadcrumbItem } from '@/shared/ui/Breadcrumbs';

import * as S from './styled';

interface PageLayoutProps extends PropsWithChildren {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  toolbar?: ReactNode;
}

export default function PageLayout({
  title,
  breadcrumbs,
  toolbar,
  children,
}: PageLayoutProps): ReactNode {
  return (
    <S.Page>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

      <S.Title>{title}</S.Title>

      {toolbar}

      {children}
    </S.Page>
  );
}
