import styled from 'styled-components';

import { media } from '@/shared/styles';

interface IconWrapperProps {
  $colorScheme: 'info' | 'danger';
}

export const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl6};
  background-color: ${({ theme }) => theme.background.secondary};

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xl2};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Card = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.container.authForm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl2};
  padding: ${({ theme }) => theme.spacing.xl2};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.shadow.default};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export const IconWrapper = styled.div<IconWrapperProps>`
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme, $colorScheme }) =>
    theme.action[$colorScheme].background};
  color: ${({ theme, $colorScheme }) => theme.status[$colorScheme]};
  padding: ${({ theme }) => theme.spacing.xs3};

  svg {
    width: ${({ theme }) => theme.size.icon.xl};
    height: ${({ theme }) => theme.size.icon.xl};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xs4};

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

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs2};
  }
`;

export const Title = styled.h1`
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

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const EventBlock = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.background.secondary};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export const EventTitle = styled.h2`
  min-width: 0;
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs2};
  }
`;
