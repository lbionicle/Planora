import styled from 'styled-components';

import { media } from '@/shared/styles';
import { ButtonColorScheme } from '@/shared/ui/Button';

interface IconWrapperProps {
  $colorScheme: ButtonColorScheme;
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const IconWrapper = styled.div<IconWrapperProps>`
  width: ${({ theme }) => theme.size.icon.xl6};
  height: ${({ theme }) => theme.size.icon.xl6};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${({ theme, $colorScheme }) => theme.action[$colorScheme].text};
  background-color: ${({ theme, $colorScheme }) =>
    theme.action[$colorScheme].background};

  svg {
    width: ${({ theme }) => theme.size.icon.xl};
    height: ${({ theme }) => theme.size.icon.xl};
  }

  @media ${media.tablet} {
    width: ${({ theme }) => theme.size.icon.xl5};
    height: ${({ theme }) => theme.size.icon.xl5};

    svg {
      width: ${({ theme }) => theme.size.icon.lg};
      height: ${({ theme }) => theme.size.icon.lg};
    }
  }

  @media ${media.tablet} {
    width: ${({ theme }) => theme.size.icon.xl4};
    height: ${({ theme }) => theme.size.icon.xl4};

    svg {
      width: ${({ theme }) => theme.size.icon.md};
      height: ${({ theme }) => theme.size.icon.md};
    }
  }
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl3};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: ${({ theme }) => theme.lineHeight.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl2};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.xl};
  line-height: ${({ theme }) => theme.lineHeight.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
