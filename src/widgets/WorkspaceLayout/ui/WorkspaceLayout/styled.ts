'use client';

import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.secondary};
`;

export const Main = styled.main`
  width: 100%;
  max-width: ${({ theme }) => theme.container.page};
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.xl8} ${theme.spacing.lg}`};
  margin: 0 auto;

  @media ${media.laptop} {
    padding: ${({ theme }) => `${theme.spacing.xl6} ${theme.spacing.lg}`};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xl4} ${theme.spacing.sm}`};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => `${theme.spacing.xl2} ${theme.spacing.sm}`};
  }
`;
