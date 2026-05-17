import styled from 'styled-components';

import { media } from '@/shared/styles';

interface ContentProps {
  $columns: 1 | 2;
}

export const Content = styled.div<ContentProps>`
  display: grid;
  grid-template-columns: ${({ $columns }) =>
    $columns === 2 ? 'repeat(2, minmax(0, 1fr))' : '1fr'};
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    grid-template-columns: 1fr;
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
  margin: 0;
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl3};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: ${({ theme }) => theme.lineHeight.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
