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

import * as S from './styled';

export interface AnalyticsAreaChartPoint {
  label: string;
  value: number;
}

interface AnalyticsAreaChartProps {
  data: AnalyticsAreaChartPoint[];
  height?: number;
  valueName?: string;
  emptyText?: string;
}

export default function AnalyticsAreaChart({
  data,
  height = 260,
  valueName = 'Значение',
  emptyText = 'Данные для графика отсутствуют',
}: AnalyticsAreaChartProps): ReactNode {
  const theme = useTheme();

  if (data.length === 0) {
    return <S.Empty>{emptyText}</S.Empty>;
  }

  return (
    <S.ChartWrapper $height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 10, left: -30, bottom: 0 }}
        >
          <CartesianGrid
            stroke={theme.border.secondary}
            strokeDasharray="0"
            vertical
            horizontal
          />

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: theme.text.secondary,
              fontSize: 12,
            }}
          />

          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: theme.text.secondary,
              fontSize: 12,
            }}
          />

          <Tooltip
            formatter={(value) => [value, valueName]}
            contentStyle={{
              border: `${theme.borderWidth.xs} solid ${theme.border.muted}`,
              borderRadius: theme.borderRadius.md,
              backgroundColor: theme.background.primary,
              color: theme.text.accent,
            }}
            labelStyle={{
              color: theme.text.accent,
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={theme.text.accent}
            strokeWidth={3}
            fill={theme.action.info.background}
            fillOpacity={1}
            activeDot={{
              r: 5,
              stroke: theme.background.primary,
              strokeWidth: 2,
              fill: theme.text.accent,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </S.ChartWrapper>
  );
}
