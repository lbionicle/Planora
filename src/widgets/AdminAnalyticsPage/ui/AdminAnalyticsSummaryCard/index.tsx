'use client';

import { ReactNode } from 'react';

import AnalyticsCard from '@/shared/ui/AnalyticsCard';

import { formatGrowthPercent } from '../../lib/formatAdminAnalytics';
import * as S from './styled';

interface AdminAnalyticsSummaryCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  growthPercent: number;
}

export default function AdminAnalyticsSummaryCard({
  title,
  value,
  icon,
  growthPercent,
}: AdminAnalyticsSummaryCardProps): ReactNode {
  return (
    <AnalyticsCard>
      <S.Content>
        <S.Header>
          <S.Title>{title}</S.Title>

          <S.Growth $value={growthPercent}>
            {formatGrowthPercent(growthPercent)}
          </S.Growth>
        </S.Header>

        <S.ValueRow>
          <S.Icon>{icon}</S.Icon>
          <S.Value>{value}</S.Value>
        </S.ValueRow>
      </S.Content>
    </AnalyticsCard>
  );
}
