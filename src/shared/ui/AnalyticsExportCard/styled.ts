import styled from 'styled-components';

import { media } from '@/shared/styles';

import AnalyticsCard from '../AnalyticsCard';

interface RootProps {
  $isDisabled: boolean;
}

interface TextBlockProps {
  $isDisabled: boolean;
}

export const Root = styled(AnalyticsCard)<RootProps>`
  justify-content: space-between;

  border-color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.action.disabled.background : theme.background.accent};

  background-color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.action.disabled.background : theme.background.accent};

  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
`;

export const TextBlock = styled.div<TextBlockProps>`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs4};

  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.action.disabled.text : theme.text.inversion};
`;

export const Title = styled.h3`
  color: inherit;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Description = styled.p`
  color: inherit;
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.md};
  opacity: 0.8;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs2};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs3};
  }
`;

export const Actions = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
  text-align: end;

  @media ${media.tablet} {
    svg {
      width: ${({ theme }) => theme.size.icon.lg};
      height: ${({ theme }) => theme.size.icon.lg};
    }
  }

  @media ${media.mobile} {
    svg {
      width: ${({ theme }) => theme.size.icon.md};
      height: ${({ theme }) => theme.size.icon.md};
    }
  }
`;
