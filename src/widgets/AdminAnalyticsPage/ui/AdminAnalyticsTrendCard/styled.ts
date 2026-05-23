import styled from 'styled-components';

interface GrowthProps {
  $value: number;
}

interface BarProps {
  $height: number;
  $isActive: boolean;
}

export const Growth = styled.div<GrowthProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.xs5};
  color: ${({ theme, $value }) =>
    $value >= 0 ? theme.action.success.text : theme.action.danger.text};
`;

export const GrowthValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;

export const GrowthText = styled.span`
  max-width: 180px;
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  text-align: right;
`;

export const Bars = styled.div`
  height: 170px;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  align-items: end;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const BarItem = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs4};
`;

export const BarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: flex-end;
`;

export const Bar = styled.div<BarProps>`
  width: 100%;
  height: ${({ $height }) => `${$height}%`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme, $isActive }) =>
    $isActive
      ? theme.analytics.chart.barAccent
      : theme.analytics.chart.barMuted};
`;

export const BarTooltip = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs4};
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  padding: ${({ theme }) => `${theme.spacing.xs5} ${theme.spacing.xs3}`};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  color: ${({ theme }) => theme.text.inversion};
  background-color: ${({ theme }) => theme.background.accent};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export const BarLabel = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-align: center;
  white-space: nowrap;
`;
