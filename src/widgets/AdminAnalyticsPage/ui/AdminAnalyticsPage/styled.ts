import styled from 'styled-components';

import { media } from '@/shared/styles';

interface GeneralGridProps {
  $isUpdating: boolean;
}

export const GeneralGrid = styled.div<GeneralGridProps>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: stretch;

  opacity: ${({ $isUpdating }) => ($isUpdating ? 0.75 : 1)};
  transition: opacity ${({ theme }) => theme.transitionDuration.sm};

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

export const MainColumn = styled.div`
  min-width: 0;
  display: grid;
  grid-template-rows: minmax(260px, auto) minmax(360px, auto);
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    grid-template-rows: auto;
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Sidebar = styled.div`
  min-width: 0;
  display: grid;
  grid-template-rows:
    repeat(4, minmax(118px, 1fr))
    minmax(150px, 1.2fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.laptop} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: auto;

    > *:last-child {
      grid-column: 1 / -1;
    }
  }

  @media ${media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing.md};

    > *:last-child {
      grid-column: 1 / -1;
    }
  }

  @media ${media.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};

    > *:last-child {
      grid-column: auto;
    }
  }
`;
