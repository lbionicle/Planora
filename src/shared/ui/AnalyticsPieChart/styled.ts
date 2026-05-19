import styled from 'styled-components';

import { media } from '@/shared/styles';

interface ChartProps {
  $height: number;
}

interface LegendColorProps {
  $color: string;
}

export const Wrapper = styled.div`
  display: grid;
  grid-template: 1fr / minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const Chart = styled.div<ChartProps>`
  width: 100%;
  height: ${({ $height }) => `${$height}px`};
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs4};
`;

export const LegendColor = styled.span<LegendColorProps>`
  width: ${({ theme }) => theme.size.icon.md};
  height: ${({ theme }) => theme.size.icon.md};
  border-radius: ${({ theme }) => theme.borderRadius.xs3};
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const LegendText = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Empty = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  text-align: center;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
