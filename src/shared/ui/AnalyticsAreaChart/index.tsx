'use client';

import { ReactNode } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from 'styled-components';

import AnalyticsEmpty from '@/shared/ui/AnalyticsEmpty';

import * as S from './styled';

export interface AnalyticsAreaChartPoint {
  date: string;
  label: string;
  tooltipLabel: string;
  value: number;
}

interface AnalyticsAreaChartProps {
  data: AnalyticsAreaChartPoint[];
  height?: number;
  valueName?: string;
  emptyText?: string;
}

function getTickInterval(pointsCount: number): number {
  if (pointsCount <= 10) {
    return 0;
  }

  if (pointsCount <= 18) {
    return 1;
  }

  if (pointsCount <= 35) {
    return 3;
  }

  if (pointsCount <= 62) {
    return 6;
  }

  return Math.ceil(pointsCount / 8) - 1;
}

function getPointLabel(data: AnalyticsAreaChartPoint[], date: string): string {
  return data.find((point) => point.date === date)?.label ?? date;
}

function getTooltipLabel(
  data: AnalyticsAreaChartPoint[],
  date: string,
): string {
  return data.find((point) => point.date === date)?.tooltipLabel ?? date;
}

export default function AnalyticsAreaChart({
  data,
  height,
  valueName = 'Значение',
  emptyText = 'Данные для графика отсутствуют',
}: AnalyticsAreaChartProps): ReactNode {
  const theme = useTheme();

  if (data.length === 0) {
    return <AnalyticsEmpty text={emptyText} />;
  }

  return (
    <S.Chart $height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -30,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke={theme.border.muted} vertical horizontal />

          <XAxis
            dataKey="date"
            interval={getTickInterval(data.length)}
            tickLine={false}
            axisLine={false}
            minTickGap={12}
            tickFormatter={(date) => getPointLabel(data, String(date))}
            tick={{
              fill: theme.text.secondary,
              fontSize: 12,
            }}
          />

          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{
              fill: theme.text.secondary,
              fontSize: 12,
            }}
          />

          <Tooltip
            cursor={{
              stroke: theme.border.secondary,
              strokeWidth: 1,
            }}
            labelFormatter={(date) => getTooltipLabel(data, String(date))}
            formatter={(value) => [value, valueName]}
            contentStyle={{
              border: `${theme.borderWidth.xs} solid ${theme.border.accent}`,
              borderRadius: theme.borderRadius.xs,
              backgroundColor: theme.background.accent,
            }}
            labelStyle={{
              color: theme.text.inversion,
            }}
            itemStyle={{
              color: theme.text.inversion,
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            name={valueName}
            stroke={theme.background.accent}
            strokeWidth={3}
            fill={theme.action.info.background}
            dot={false}
            activeDot={{
              r: 5,
              stroke: theme.background.primary,
              strokeWidth: 2,
              fill: theme.background.accent,
            }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </S.Chart>
  );
}
