import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  gap: ${({ theme }) => theme.spacing.xs4};

  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Chip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs2};
  padding: ${({ theme }) => `${theme.spacing.xs4} ${theme.spacing.xs3}`};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.text.accent};
  background-color: ${({ theme }) => theme.action.info.background};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.action.info.backgroundHover};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.action.info.backgroundActive};
  }

  svg {
    flex-shrink: 0;
    width: ${({ theme }) => theme.size.icon.xs2};
    height: ${({ theme }) => theme.size.icon.xs2};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xs4} ${theme.spacing.xs3}`};
    gap: ${({ theme }) => theme.spacing.xs4};
  }
`;
