import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Page = styled.main`
  min-height: 100dvh;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl6};

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;
