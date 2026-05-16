'use client';

import styled from 'styled-components';

import { media } from '@/shared/styles';

const ITEM_WIDTH = {
  default: '220px',
  laptop: '200px',
  tablet: '180px',
  mobile: '160px',
};

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs6};
`;

export const MenuItem = styled.button`
  width: ${ITEM_WIDTH.default};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs4};
  padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xs}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.text.secondary};

  &:last-child {
    color: ${({ theme }) => theme.status.danger};
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.action.neutral.backgroundHover};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.action.neutral.backgroundActive};
  }

  @media ${media.laptop} {
    width: ${ITEM_WIDTH.laptop};
  }

  @media ${media.tablet} {
    width: ${ITEM_WIDTH.tablet};
    padding: ${({ theme }) => `${theme.spacing.xs3} ${theme.spacing.xs2}`};
  }

  @media ${media.mobile} {
    width: ${ITEM_WIDTH.mobile};
  }
`;

export const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media ${media.tablet} {
    width: ${({ theme }) => theme.size.icon.sm};
    height: ${({ theme }) => theme.size.icon.sm};
  }
`;

export const Text = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.sm};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
