import styled from 'styled-components';

import { media } from '@/shared/styles';

interface GrowthProps {
  $value: number;
}

function getGrowthColor(value: number): 'success' | 'danger' | 'neutral' {
  if (value > 0) {
    return 'success';
  }

  if (value < 0) {
    return 'danger';
  }

  return 'neutral';
}

export const Content = styled.div`
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Header = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h3`
  min-width: 0;
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Growth = styled.span<GrowthProps>`
  flex-shrink: 0;
  color: ${({ theme, $value }) => theme.action[getGrowthColor($value)].text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  white-space: nowrap;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const ValueRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.text.accent};
  background-color: ${({ theme }) => theme.action.info.background};
  padding: ${({ theme }) => theme.spacing.xs4};

  svg {
    width: ${({ theme }) => theme.size.icon.lg};
    height: ${({ theme }) => theme.size.icon.lg};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xs5};

    svg {
      width: ${({ theme }) => theme.size.icon.md};
      height: ${({ theme }) => theme.size.icon.md};
    }
  }

  @media ${media.mobile} {
    svg {
      width: ${({ theme }) => theme.size.icon.sm};
      height: ${({ theme }) => theme.size.icon.sm};
    }
  }
`;

export const Value = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl5};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl3};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;
