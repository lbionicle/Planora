'use client';

import styled from 'styled-components';

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
`;

export const Icon = styled.span`
  width: ${({ theme }) => theme.size.icon.sm};
  height: ${({ theme }) => theme.size.icon.sm};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.span`
  max-width: 100%;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSize.md};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Input = styled.input`
  display: none;
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.status.danger};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.sm};
`;
