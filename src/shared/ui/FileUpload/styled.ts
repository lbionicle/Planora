import styled from 'styled-components';

import { media } from '@/shared/styles';

interface FieldProps {
  $hasError: boolean;
  $isDisabled: boolean;
}

export const Wrapper = styled.div`
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

export const Field = styled.label<FieldProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  gap: ${({ theme }) => theme.spacing.xs4};
  border: ${({ theme }) => theme.borderWidth.xs} dashed;
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.border.danger : theme.border.accent};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.action.accent.border};
  background-color: ${({ theme }) => theme.fileUpload.background};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.fileUpload.backgroundHover};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.fileUpload.backgroundActive};
  }

  @media ${media.tablet} {
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xs}`};
  }
`;

export const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: ${({ theme }) => theme.size.icon.sm};
  height: ${({ theme }) => theme.size.icon.sm};

  @media ${media.tablet} {
    width: ${({ theme }) => theme.size.icon.xs};
    height: ${({ theme }) => theme.size.icon.xs};
  }
`;

export const Text = styled.span`
  max-width: 100%;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.md};
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Input = styled.input`
  display: none;
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.status.danger};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.sm};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs3};
  }
`;
