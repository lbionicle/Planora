'use client';

import { ReactNode, useMemo } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { DefaultTheme, useTheme } from 'styled-components';

import * as S from './styled';

export type AnalyticsPieSegmentTone = 'accent' | 'info' | 'neutral';

export interface AnalyticsPieSegment {
  key: string;
  label: string;
  value: number;
  tone: AnalyticsPieSegmentTone;
}

interface AnalyticsPieChartProps {
  segments: AnalyticsPieSegment[];
  height?: number;
  emptyText?: string;
}

function getPercent(value: number, total: number): number {
  if (total <= 0) {
    return 0;
  }

  return Math.round((value / total) * 100);
}

function getNumberValue(value: unknown, fallback = 0): number {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const parsedValue = Number(value);

    return Number.isNaN(parsedValue) ? fallback : parsedValue;
  }

  return fallback;
}

function getSegmentColor(
  theme: DefaultTheme,
  tone: AnalyticsPieSegmentTone,
): string {
  if (tone === 'accent') {
    return theme.analytics.pie.accepted;
  }

  if (tone === 'info') {
    return theme.analytics.pie.declined;
  }

  return theme.analytics.pie.waiting;
}

function renderPieLabel(
  props: PieLabelRenderProps,
  theme: DefaultTheme,
): ReactNode {
  const cx = getNumberValue(props.cx);
  const cy = getNumberValue(props.cy);
  const midAngle = getNumberValue(props.midAngle);
  const innerRadius = getNumberValue(props.innerRadius);
  const outerRadius = getNumberValue(props.outerRadius);
  const percent = getNumberValue(props.percent);

  const percentValue = Math.round(percent * 100);

  if (percentValue <= 0) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.58;
  const angle = (-midAngle * Math.PI) / 180;

  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);

  return (
    <text
      x={x}
      y={y}
      fill={theme.text.inversion}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={16}
      fontWeight={400}
      pointerEvents="none"
    >
      {percentValue}%
    </text>
  );
}

export default function AnalyticsPieChart({
  segments,
  height = 240,
  emptyText = 'Данные для диаграммы отсутствуют',
}: AnalyticsPieChartProps): ReactNode {
  const theme = useTheme();

  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  const chartData = useMemo(() => {
    return segments.map((segment) => ({
      ...segment,
      color: getSegmentColor(theme, segment.tone),
      percentValue: getPercent(segment.value, total),
    }));
  }, [segments, theme, total]);

  if (total <= 0) {
    return <S.Empty>{emptyText}</S.Empty>;
  }

  return (
    <S.Wrapper>
      <S.Chart $height={height}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                border: 'none',
                padding: `${theme.spacing.xs4} ${theme.spacing.xs2}`,
                borderRadius: theme.borderRadius.xs3,
                backgroundColor: theme.background.primary,
              }}
              labelStyle={{
                color: theme.text.accent,
              }}
              itemStyle={{
                color: theme.text.accent,
              }}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius="90%"
              label={(props) => renderPieLabel(props, theme)}
              labelLine={false}
              isAnimationActive={false}
              stroke="none"
            >
              {chartData.map((segment) => (
                <Cell key={segment.key} fill={segment.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </S.Chart>

      <S.Legend>
        {chartData.map((segment) => (
          <S.LegendItem key={segment.key}>
            <S.LegendColor $color={segment.color} />

            <S.LegendText>{segment.label}</S.LegendText>
          </S.LegendItem>
        ))}
      </S.Legend>
    </S.Wrapper>
  );
}
