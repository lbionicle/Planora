import styled from 'styled-components';

import { media } from '@/shared/styles';

interface ChartProps {
  $height?: number;
}

export const Chart = styled.div<ChartProps>`
  width: 100%;
  min-width: 0;
  min-height: 0;
  flex: 1 1 auto;

  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};

  @media ${media.laptop} {
    height: ${({ $height }) => ($height ? `${$height}px` : '280px')};
  }

  @media ${media.mobile} {
    height: ${({ $height }) => ($height ? `${$height}px` : '240px')};
  }
`;
