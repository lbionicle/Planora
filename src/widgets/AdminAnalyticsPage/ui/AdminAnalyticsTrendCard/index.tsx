'use client';

import { ReactNode } from 'react';

import { AnalyticsDatePoint } from '@/entities/event/model/analyticsTypes';
import AnalyticsCard from '@/shared/ui/AnalyticsCard';

import {
  formatChartDate,
  formatGrowthPercent,
} from '../../lib/formatAdminAnalytics';
import * as S from './styled';

interface AdminAnalyticsTrendCardProps {
  title: string;
  growthPercent: number;
  growthDescription: string;
  points: AnalyticsDatePoint[];
}

export default function AdminAnalyticsTrendCard({
  title,
  growthPercent,
  growthDescription,
  points,
}: AdminAnalyticsTrendCardProps): ReactNode {
  const maxValue = Math.max(...points.map((point) => point.value), 1);
  const activePoint = points.reduce<AnalyticsDatePoint | null>(
    (maxPoint, point) => {
      if (!maxPoint || point.value > maxPoint.value) {
        return point;
      }

      return maxPoint;
    },
    null,
  );

  return (
    <AnalyticsCard
      title={title}
      headerRight={
        <S.Growth $value={growthPercent}>
          <S.GrowthValue>{formatGrowthPercent(growthPercent)}</S.GrowthValue>
          <S.GrowthText>{growthDescription}</S.GrowthText>
        </S.Growth>
      }
    >
      <S.Bars>
        {points.map((point) => {
          const isActive = activePoint?.date === point.date;

          return (
            <S.BarItem key={point.date}>
              <S.BarWrapper>
                {isActive && <S.BarTooltip>{point.value}</S.BarTooltip>}

                <S.Bar
                  $height={Math.max((point.value / maxValue) * 100, 12)}
                  $isActive={isActive}
                />
              </S.BarWrapper>

              <S.BarLabel>{formatChartDate(point.date)}</S.BarLabel>
            </S.BarItem>
          );
        })}
      </S.Bars>
    </AnalyticsCard>
  );
}
