import styled, { css } from 'styled-components';

import { media } from '@/shared/styles';
import { InputVariant } from '@/shared/ui/Input';

interface FieldProps {
  $hasError: boolean;
  $isDisabled: boolean;
  $variant: InputVariant;
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

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs6};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.text.secondary};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Field = styled.label<FieldProps>`
  ${({ $variant, $isDisabled }) => getFieldVariantStyles($variant, $isDisabled)}

  width: 100%;
  display: flex;
  border: ${({ theme }) => theme.borderWidth.xs} solid;
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.border.danger : theme.border.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'text')};

  transition:
    border-color ${({ theme }) => theme.transitionDuration.sm},
    background-color ${({ theme }) => theme.transitionDuration.sm};

  &:focus-within {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.border.danger : theme.border.accent};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xs}`};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: vertical;
  border: 0;
  color: ${({ theme }) => theme.text.primary};
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.text.muted};
  }

  &:disabled {
    color: ${({ theme }) => theme.text.muted};
    cursor: not-allowed;
  }

  @media ${media.tablet} {
    min-height: 100px;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    min-height: 90px;
    font-size: ${({ theme }) => theme.fontSize.xs};
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
