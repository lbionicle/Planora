import styled from 'styled-components';

import { media } from '@/shared/styles';

interface ChartWrapperProps {
  $height: number;
}

export const ChartWrapper = styled.div<ChartWrapperProps>`
  width: 100%;
  height: ${({ $height }) => `${$height}px`};
  min-width: 0;
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
