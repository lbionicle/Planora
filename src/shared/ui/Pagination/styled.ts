'use client';

import styled from 'styled-components';

import { media } from '@/shared/styles';

interface ButtonProps {
  $isActive?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs2};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs2}`};

  @media ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs3}`};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xs3}`};
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs6};
`;

export const Button = styled.button<ButtonProps>`
  width: ${({ theme }) => theme.pagination.width};
  height: ${({ theme }) => theme.pagination.height};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs2};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.text.accent : theme.text.secondary};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.action.info.background : 'transparent'};
  font-size: ${({ theme }) => theme.fontSize.md};
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ $isActive, theme }) =>
      $isActive
        ? theme.action.info.background
        : theme.action.neutral.backgroundHover};
  }

  &:active:not(:disabled) {
    background-color: ${({ $isActive, theme }) =>
      $isActive
        ? theme.action.info.background
        : theme.action.neutral.backgroundActive};
  }

  &:disabled {
    color: ${({ theme }) => theme.pagination.disabled.text};
    cursor: not-allowed;
  }

  @media ${media.tablet} {
    width: ${({ theme }) => theme.spacing.xl6};
    height: ${({ theme }) => theme.spacing.xl6};
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding: ${({ theme }) => theme.spacing.xs3};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  @media ${media.mobile} {
    width: ${({ theme }) => theme.spacing.xl5};
    height: ${({ theme }) => theme.spacing.xl5};
    font-size: ${({ theme }) => theme.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs4};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
  }
`;

export const Ellipsis = styled.span`
  padding: ${({ theme }) => theme.spacing.xs2};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.text.secondary};
  text-align: center;

  @media ${media.tablet} {
    width: ${({ theme }) => theme.spacing.xl6};
    height: ${({ theme }) => theme.spacing.xl6};
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding: ${({ theme }) => theme.spacing.xs3};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  @media ${media.mobile} {
    width: ${({ theme }) => theme.spacing.xl5};
    height: ${({ theme }) => theme.spacing.xl5};
    font-size: ${({ theme }) => theme.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs4};
    border-radius: ${({ theme }) => theme.borderRadius.xs};
  }
`;
