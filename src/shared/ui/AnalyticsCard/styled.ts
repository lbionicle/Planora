import styled from 'styled-components';

import { media } from '@/shared/styles';

import { AnalyticsCardVariant } from '.';

interface CardProps {
  $variant: AnalyticsCardVariant;
}

interface TitleProps {
  $variant: AnalyticsCardVariant;
}

export const Card = styled.div<CardProps>`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: ${({ theme }) => theme.borderWidth.xs} solid;
  border-radius: ${({ theme }) => theme.borderRadius.xl3};

  border-color: ${({ theme, $variant }) =>
    theme.analytics.card[$variant].border};
  background-color: ${({ theme, $variant }) =>
    theme.analytics.card[$variant].background};

  > * {
    min-width: 0;
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.xl2};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }
`;

export const Header = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Title = styled.h3<TitleProps>`
  min-width: 0;
  color: ${({ theme, $variant }) =>
    $variant === 'accent' ? theme.text.inversion : theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl3};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl2};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;
