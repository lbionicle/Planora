import styled, { css } from 'styled-components';

import { ButtonColorScheme, ButtonSize } from '.';

interface ButtonProps {
  $size: ButtonSize;
  $colorScheme: ButtonColorScheme;
  $fullWidth: boolean;
  $rounded: boolean;
  $bordered: boolean;
}

function getSizeStyles(size: ButtonSize) {
  const styles = {
    xs: css`
      padding: ${({ theme }) => theme.spacing.xs5};
      border-radius: ${({ theme }) => theme.borderRadius.xs};
      font-size: ${({ theme }) => theme.fontSize.xs};
    `,
    sm: css`
      padding: ${({ theme }) => theme.spacing.xs3};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      font-size: ${({ theme }) => theme.fontSize.md};
    `,
    md: css`
      padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xl4}`};
      border-radius: ${({ theme }) => theme.borderRadius.md};
      font-size: ${({ theme }) => theme.fontSize.md};
    `,
    lg: css`
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl6}`};
      border-radius: ${({ theme }) => theme.borderRadius.md};
      font-size: ${({ theme }) => theme.fontSize.xl};
    `,
  };

  return styles[size];
}

export const Button = styled.button<ButtonProps>`
  ${({ $size }) => getSizeStyles($size)}

  display: inline-flex;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  align-items: center;
  justify-content: center;
  border-width: ${({ $bordered, theme }) =>
    $bordered ? theme.borderWidth.xs : '0'};
  border-style: solid;
  border-color: ${({ $colorScheme, theme }) =>
    theme.action[$colorScheme].border};
  border-radius: ${({ $rounded }) => ($rounded ? '50%' : undefined)};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;

  background-color: ${({ theme, $colorScheme }) =>
    theme.action[$colorScheme].background};
  color: ${({ theme, $colorScheme }) => theme.action[$colorScheme].text};

  transition:
    background ${({ theme }) => theme.transitionDuration.sm},
    color ${({ theme }) => theme.transitionDuration.sm};

  &:hover:not(:disabled) {
    background: ${({ theme, $colorScheme }) =>
      theme.action[$colorScheme].backgroundHover};
  }

  &:active:not(:disabled) {
    background: ${({ theme, $colorScheme }) =>
      theme.action[$colorScheme].backgroundActive};
  }

  &:disabled {
    color: ${({ theme }) => theme.action.disabled.text};
    border-color: ${({ theme }) => theme.action.disabled.border};
    background: ${({ theme }) => theme.action.disabled.background};
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
  }
`;
