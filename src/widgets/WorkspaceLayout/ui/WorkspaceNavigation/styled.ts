import Link from 'next/link';
import styled from 'styled-components';

import { media } from '@/shared/styles';

interface NavigationLinkProps {
  $isActive: boolean;
}

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl4};

  @media ${media.laptop} {
    gap: ${({ theme }) => theme.spacing.xl2};
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const NavigationLink = styled(Link)<NavigationLinkProps>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs7};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.text.accent : theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ $isActive, theme }) =>
    $isActive ? theme.fontWeight.medium : theme.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  text-decoration: none;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs3};
  }
`;

export const NavigationIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.size.icon.md};
  height: ${({ theme }) => theme.size.icon.md};

  svg {
    flex-shrink: 0;
  }

  @media ${media.tablet} {
    width: ${({ theme }) => theme.size.icon.sm};
    height: ${({ theme }) => theme.size.icon.sm};
  }
`;
