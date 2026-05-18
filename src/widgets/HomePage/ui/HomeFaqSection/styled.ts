import styled from 'styled-components';

import { media } from '@/shared/styles';

interface AccordionProps {
  $isOpen: boolean;
}

export const Section = styled.section`
  width: min(100%, ${({ theme }) => theme.container.page});
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const Title = styled.h2`
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

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }
`;

export const Item = styled.div<AccordionProps>`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  background-color: ${({ $isOpen, theme }) =>
    $isOpen ? theme.accordion.backgroundSelected : theme.accordion.background};
`;

export const Button = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: transparent;

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.sm};
    align-items: flex-start;
  }
`;

export const Number = styled.span<AccordionProps>`
  color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.accordion.textSelected : theme.accordion.textMuted};
  font-size: ${({ theme }) => theme.fontSize.xl6};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl5};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl3};
  }
`;

export const Question = styled.span<AccordionProps>`
  color: ${({ theme, $isOpen }) =>
    $isOpen ? theme.accordion.textSelected : theme.accordion.text};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: left;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const Icon = styled.span`
  width: ${({ theme }) => theme.size.icon.md};
  height: ${({ theme }) => theme.size.icon.md};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text.muted};

  @media ${media.mobile} {
    width: ${({ theme }) => theme.size.icon.sm};
    height: ${({ theme }) => theme.size.icon.sm};
  }
`;

export const Answer = styled.p`
  padding: ${({ theme }) =>
    `0 ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.lg}`};
  color: ${({ theme }) => theme.accordion.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};

  @media ${media.tablet} {
    padding: ${({ theme }) =>
      `0 ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) =>
      `0 ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
