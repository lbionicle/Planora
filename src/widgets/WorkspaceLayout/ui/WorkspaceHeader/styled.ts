'use client';

import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Header = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  border-bottom: ${({ theme }) =>
    `${theme.borderWidth.xs} solid ${theme.border.muted}`};
`;

export const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.container.page};
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  margin: 0 auto;

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl4};

  @media ${media.laptop} {
    gap: ${({ theme }) => theme.spacing.xl2};
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;
