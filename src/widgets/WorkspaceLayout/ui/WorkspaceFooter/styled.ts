'use client';

import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Footer = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.background.primary};
  border-top: ${({ theme }) =>
    `${theme.borderWidth.xs} solid ${theme.border.muted}`};
`;

export const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.container.page};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  padding: ${({ theme }) => theme.spacing.lg};
  margin: 0 auto;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs3};
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;
