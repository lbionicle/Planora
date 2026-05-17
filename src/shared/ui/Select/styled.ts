'use client';

import styled, { css } from 'styled-components';

import { media } from '@/shared/styles';
import { InputVariant } from '@/shared/ui/Input';

interface WrapperProps {
  $fullWidth: boolean;
}

interface FieldProps {
  $hasError: boolean;
  $isDisabled: boolean;
  $variant: InputVariant;
}

interface SelectProps {
  $hasError: boolean;
  $isDisabled: boolean;
}

interface ArrowProps {
  $isOpen: boolean;
  $isDisabled: boolean;
}

function getFieldVariantStyles(variant: InputVariant, isDisabled: boolean) {
  if (isDisabled) {
    return css`
      background-color: ${({ theme }) => theme.background.muted};
    `;
  }

  if (variant === 'default') {
    return css`
      background-color: ${({ theme }) => theme.background.primary};
    `;
  }

  return css`
    background-color: transparent;
  `;
}

export const Wrapper = styled.div<WrapperProps>`
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs6};
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Field = styled.div<FieldProps>`
  ${({ $variant, $isDisabled }) => getFieldVariantStyles($variant, $isDisabled)}

  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border: ${({ theme }) => theme.borderWidth.xs} solid;
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.border.danger : theme.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};

  transition:
    border-color ${({ theme }) => theme.transitionDuration.sm},
    background-color ${({ theme }) => theme.transitionDuration.sm};

  &:focus-within {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.border.danger : theme.border.accent};
  }

  @media ${media.tablet} {
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const Select = styled.select<SelectProps>`
  width: 100%;
  border: 0;
  padding: ${({ theme }) =>
    `${theme.spacing.xs} ${theme.spacing.xl6} ${theme.spacing.xs} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.text.primary};
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSize.md};
  outline: none;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:disabled {
    color: ${({ theme }) => theme.text.muted};
  }

  option {
    color: ${({ theme }) => theme.text.primary};
    background-color: ${({ theme }) => theme.background.primary};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) =>
      `${theme.spacing.xs2} ${theme.spacing.xl4} ${theme.spacing.xs2} ${theme.spacing.xs}`};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Arrow = styled.span<ArrowProps>`
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.spacing.md};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.text.muted : theme.text.secondary};
  pointer-events: none;

  transform: translateY(-50%)
    rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});

  transition:
    transform ${({ theme }) => theme.transitionDuration.sm},
    color ${({ theme }) => theme.transitionDuration.sm};

  svg {
    width: ${({ theme }) => theme.size.icon.xs2};
    height: ${({ theme }) => theme.size.icon.xs2};
  }

  @media ${media.tablet} {
    right: ${({ theme }) => theme.spacing.xs};
  }
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.status.danger};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.sm};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs3};
  }
`;
