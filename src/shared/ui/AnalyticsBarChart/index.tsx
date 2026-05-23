'use client';

import { ReactNode, useMemo } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from 'styled-components';

import AnalyticsEmpty from '@/shared/ui/AnalyticsEmpty';

import * as S from './styled';

export interface AnalyticsBarChartPoint {
  date: string;
  label: string;
  tooltipLabel: string;
  value: number;
}

interface AnalyticsBarChartProps {
  data: AnalyticsBarChartPoint[];
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

function getPointLabel(data: AnalyticsBarChartPoint[], date: string): string {
  return data.find((point) => point.date === date)?.label ?? date;
}

function getTooltipLabel(data: AnalyticsBarChartPoint[], date: string): string {
  return data.find((point) => point.date === date)?.tooltipLabel ?? date;
}

export default function AnalyticsBarChart({
  data,
  height,
  valueName = 'Значение',
  emptyText = 'Данные для графика отсутствуют',
}: AnalyticsBarChartProps): ReactNode {
  const theme = useTheme();

  const maxValue = useMemo(() => {
    return Math.max(...data.map((point) => point.value), 0);
  }, [data]);

  if (data.length === 0) {
    return <AnalyticsEmpty text={emptyText} />;
  }

  return (
    <S.Chart $height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 8,
            bottom: 0,
            left: 8,
          }}
          barCategoryGap="24%"
        >
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

          <YAxis hide />

          <Tooltip
            cursor={{
              fill: 'transparent',
            }}
            labelFormatter={(date) => getTooltipLabel(data, String(date))}
            formatter={(value) => [value, valueName]}
            contentStyle={{
              border: 'none',
              padding: `${theme.spacing.xs4} ${theme.spacing.xs2}`,
              borderRadius: theme.borderRadius.xs,
              backgroundColor: theme.background.accent,
              color: theme.text.inversion,
            }}
            labelStyle={{
              color: theme.text.inversion,
            }}
            itemStyle={{
              color: theme.text.inversion,
            }}
          />

          <Bar
            dataKey="value"
            name={valueName}
            maxBarSize={56}
            minPointSize={8}
            radius={[12, 12, 12, 12]}
            isAnimationActive={false}
          >
            {data.map((point) => {
              const isActive = maxValue > 0 && point.value === maxValue;

              return (
                <Cell
                  key={point.date}
                  fill={
                    isActive
                      ? theme.background.accent
                      : theme.action.info.background
                  }
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </S.Chart>
  );
}
