'use client';

import { ReactNode } from 'react';

import * as S from './styled';

interface AnalyticsEmptyProps {
  text?: string;
  children?: ReactNode;
  className?: string;
}

export default function AnalyticsEmpty({
  text = 'Данные отсутствуют',
  children,
  className,
}: AnalyticsEmptyProps): ReactNode {
  return <S.Empty className={className}>{children ?? text}</S.Empty>;
}
