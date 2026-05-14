'use client';

import styled, { css } from 'styled-components';

import { InputVariant } from '.';

interface FieldProps {
  $hasError: boolean;
  $isDisabled: boolean;
  $variant: InputVariant;
}

interface InputProps {
  $hasLeftIcon: boolean;
  $hasRightElement: boolean;
}

function getFieldVariantStyles(variant: InputVariant) {
  if (variant === 'default') {
    return css`
      background: ${({ theme }) => theme.background.primary};
    `;
  }

  return css`
    background: transparent;
  `;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs6};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.text.secondary};
`;

export const Field = styled.label<FieldProps>`
  ${({ $variant }) => getFieldVariantStyles($variant)}

  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs4};
  border: ${({ theme }) => theme.borderWidth.xs} solid;
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.border.danger : theme.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'text')};

  transition:
    border-color ${({ theme }) => theme.transitionDuration.sm},
    background ${({ theme }) => theme.transitionDuration.sm};

  &:focus-within {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.border.danger : theme.border.accent};
  }
`;

export const LeftIcon = styled.span`
  width: ${({ theme }) => theme.size.icon.sm};
  height: ${({ theme }) => theme.size.icon.sm};
  color: ${({ theme }) => theme.text.muted};
`;

export const RightElement = styled.span`
  width: ${({ theme }) => theme.size.icon.md};
  height: ${({ theme }) => theme.size.icon.md};
  color: ${({ theme }) => theme.text.secondary};
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  border: 0;
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  background-color: transparent;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.text.muted};
  }

  &:disabled {
    color: ${({ theme }) => theme.text.muted};
    cursor: not-allowed;
  }
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.status.danger};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.sm};
`;
