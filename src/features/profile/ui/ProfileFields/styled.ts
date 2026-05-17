import styled from 'styled-components';

import { media } from '@/shared/styles';

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs4};
  }
`;
