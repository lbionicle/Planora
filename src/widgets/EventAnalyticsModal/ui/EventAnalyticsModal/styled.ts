import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl3};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: stretch;

  @media ${media.laptop} {
    grid-template-columns: 1fr;
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const LeftColumn = styled.div`
  min-width: 0;
  display: grid;
  grid-template-rows: 0.42fr 0.58fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.laptop} {
    grid-template-rows: auto;
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const RightColumn = styled.div`
  min-width: 0;
  display: grid;
  grid-template-rows: 0.68fr 0.32fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.laptop} {
    grid-template-rows: auto;
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CardSlot = styled.div`
  min-width: 0;
  display: flex;

  > * {
    width: 100%;
    height: 100%;
  }
`;

export const Empty = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  text-align: center;
`;
