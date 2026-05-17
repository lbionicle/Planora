'use client';

import styled from 'styled-components';

import { media } from '@/shared/styles';

interface ButtonProps {
  $isActive: boolean;
}

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xs7};
  padding: ${({ theme }) => theme.spacing.xs7};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.action.info.background};

  @media ${media.tablet} {
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const Button = styled.button<ButtonProps>`
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.action.accent.text : theme.action.secondary.text};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.action.accent.background : 'transparent'};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xl6}`};
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ $isActive, theme }) =>
      $isActive
        ? theme.action.accent.background
        : theme.action.info.backgroundHover};
  }

  &:active:not(:disabled) {
    background-color: ${({ $isActive, theme }) =>
      $isActive
        ? theme.action.accent.background
        : theme.action.info.backgroundActive};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.action.disabled.background};
    color: ${({ theme }) => theme.action.disabled.text};
  }

  @media ${media.tablet} {
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    padding: ${({ theme }) => `${theme.spacing.xs3} ${theme.spacing.xl2}`};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
