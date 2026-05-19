'use client';

import { ReactNode } from 'react';

import AnalyticsCard from '@/shared/ui/AnalyticsCard';

import * as S from './styled';

interface AnalyticsOccupancyCardProps {
  title?: string;
  percent: number;
  availableCount: number;
  occupiedCount: number;
  totalCount: number;
  availableLabel?: string;
  occupiedLabel?: string;
  totalLabel?: string;
}

export default function AnalyticsOccupancyCard({
  title = 'Заполненность мероприятия',
  percent,
  availableCount,
  occupiedCount,
  totalCount,
  availableLabel = 'Свободно',
  occupiedLabel = 'Занято',
  totalLabel = 'Всего мест',
}: AnalyticsOccupancyCardProps): ReactNode {
  const safePercent = Math.min(Math.max(percent, 0), 100);

  return (
    <AnalyticsCard variant="soft" title={title}>
      <S.Percent>{safePercent}%</S.Percent>

      <S.Progress>
        <S.ProgressValue $percent={safePercent} />
      </S.Progress>

      <S.StatsRow>
        <S.StatItem>
          <S.StatLabel>{availableLabel}</S.StatLabel>
          <S.StatValue>{availableCount}</S.StatValue>
        </S.StatItem>

        <S.StatItem>
          <S.StatLabel>{occupiedLabel}</S.StatLabel>
          <S.StatValue>{occupiedCount}</S.StatValue>
        </S.StatItem>

        <S.StatItem>
          <S.StatLabel>{totalLabel}</S.StatLabel>
          <S.StatValue>{totalCount}</S.StatValue>
        </S.StatItem>
      </S.StatsRow>
    </AnalyticsCard>
  );
}
