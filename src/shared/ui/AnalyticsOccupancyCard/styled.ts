import styled from 'styled-components';

import { media } from '@/shared/styles';

interface ProgressValueProps {
  $percent: number;
}

export const Percent = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl6};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl5};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl3};
  }
`;

export const Progress = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.spacing.xs3};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xs2};
  background-color: ${({ theme }) => theme.analytics.range.background};

  @media ${media.tablet} {
    height: ${({ theme }) => theme.spacing.xs4};
    border-radius: ${({ theme }) => theme.borderRadius.xs3};
  }
`;

export const ProgressValue = styled.div<ProgressValueProps>`
  width: ${({ $percent }) => `${$percent}%`};
  height: 100%;
  border-radius: inherit;
  background-color: ${({ theme }) => theme.analytics.range.backgroundBar};
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs6};
  border-right: ${({ theme }) =>
    `${theme.borderWidth.xs} solid ${theme.analytics.range.background}`};

  &:last-child {
    border-right: 0;
  }
`;

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const StatValue = styled.span`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl6};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl5};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl3};
  }
`;
