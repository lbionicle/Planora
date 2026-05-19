'use client';

import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import * as S from './styled';

export type AnalyticsCardVariant = 'default' | 'soft' | 'accent';

interface AnalyticsCardProps
  extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  title?: string;
  headerRight?: ReactNode;
  variant?: AnalyticsCardVariant;
}

export default function AnalyticsCard({
  title,
  headerRight,
  variant = 'default',
  children,
  ...props
}: AnalyticsCardProps): ReactNode {
  return (
    <S.Card $variant={variant} {...props}>
      {(title || headerRight) && (
        <S.Header>
          {title && <S.Title $variant={variant}>{title}</S.Title>}
          {headerRight}
        </S.Header>
      )}

      {children}
    </S.Card>
  );
}
