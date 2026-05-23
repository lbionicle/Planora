import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;
