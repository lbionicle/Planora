'use client';

import styled from 'styled-components';

import { media } from '@/shared/styles';
import Button from '@/shared/ui/Button';

const EMAIL_MAX_WIDTH = '180px';

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs4};
  padding: ${({ theme }) => theme.spacing.xs6};

  @media ${media.tablet} {
    padding: 0;
  }
`;

export const UserImage = styled.div`
  position: relative;
  width: ${({ theme }) => theme.size.icon.xl4};
  height: ${({ theme }) => theme.size.icon.xl4};
  border-radius: 50%;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

export const Email = styled.span`
  max-width: ${EMAIL_MAX_WIDTH};
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media ${media.tablet} {
    display: none;
  }
`;

export const UserSignIn = styled(Button)`
  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const LogoutButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs6};
  border: 0;
  color: ${({ theme }) => theme.text.muted};
  background: transparent;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
