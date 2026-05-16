'use client';

import styled from 'styled-components';

import { media } from '@/shared/styles';
import Button from '@/shared/ui/Button';

export const DownloadButton = styled.button`
  padding: 0;
  border: 0;
  color: ${({ theme }) => theme.action.secondary.text};
  background: transparent;
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: ${({ theme }) => theme.lineHeight.md};
  text-decoration: underline;
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.text.muted};
    cursor: not-allowed;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const AcceptButton = styled(Button).attrs({
  size: 'xs',
  colorScheme: 'success',
})`
  padding: ${({ theme }) => theme.spacing.xs4};

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xs5};

    svg {
      width: ${({ theme }) => theme.spacing.md};
      height: ${({ theme }) => theme.spacing.md};
    }
  }
`;

export const RejectedButton = styled(Button).attrs({
  size: 'xs',
  colorScheme: 'danger',
})`
  padding: ${({ theme }) => theme.spacing.xs4};

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xs5};

    svg {
      width: ${({ theme }) => theme.spacing.md};
      height: ${({ theme }) => theme.spacing.md};
    }
  }
`;
