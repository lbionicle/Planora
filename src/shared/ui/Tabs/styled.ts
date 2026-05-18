import styled from 'styled-components';

import { media } from '@/shared/styles';

interface TabProps {
  $isActive: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  border-bottom: ${({ theme }) =>
    `${theme.borderWidth.xs} solid ${theme.border.secondary}`};

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Tab = styled.button<TabProps>`
  position: relative;
  padding: ${({ theme }) => `${theme.spacing.xs2} 0`};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.text.accent : theme.text.muted};
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme, $isActive }) =>
    $isActive ? theme.fontWeight.semibold : theme.fontWeight.medium};
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -${({ theme }) => theme.borderWidth.xs};
    left: 0;
    height: ${({ theme }) => theme.borderWidth.xs};
    background-color: ${({ $isActive, theme }) =>
      $isActive ? theme.text.accent : 'transparent'};
  }

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding: ${({ theme }) => `${theme.spacing.xs3} 0`};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
