import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Content = styled.div`
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

export const Section = styled.div`
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

export const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl3};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
