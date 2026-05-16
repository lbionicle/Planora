import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
  }
  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;
