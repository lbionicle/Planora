import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl8};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl6};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xl2};
  }
`;
