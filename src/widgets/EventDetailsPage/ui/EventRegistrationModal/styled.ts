import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl4};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl2};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.borderWidth.xs};
  background-color: ${({ theme }) => theme.border.secondary};
`;

export const TicketRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }

  @media ${media.mobile} {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }
`;

export const Hint = styled.p`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};
  white-space: pre-line;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Counter = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl4};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl2};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CounterValue = styled.div`
  min-width: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl3};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: center;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const Section = styled.section`
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

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl3};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl2};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;
