import styled from 'styled-components';

import { media } from '@/shared/styles';

interface ChartProps {
  $height?: number;
}

interface LegendColorProps {
  $color: string;
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  flex: 1 1 auto;

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media ${media.tablet} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Chart = styled.div<ChartProps>`
  width: 100%;
  min-width: 0;
  min-height: 0;

  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};

  @media ${media.tablet} {
    height: ${({ $height }) => ($height ? `${$height}px` : '220px')};
  }

  @media ${media.mobile} {
    height: ${({ $height }) => ($height ? `${$height}px` : '180px')};
  }
`;

export const Legend = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs4};
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

  @media ${media.mobile} {
    width: ${({ theme }) => theme.size.icon.sm};
    height: ${({ theme }) => theme.size.icon.sm};
  }
`;

export const LegendText = styled.span`
  min-width: 0;
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
    line-height: ${({ theme }) => theme.lineHeight.sm};
  }
`;
