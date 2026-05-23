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
  width: 100%;
  min-width: 0;

  height: min(56vh, 700px);

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: stretch;

  @media ${media.laptop} {
    height: auto;
    grid-template-columns: 1fr;
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Column = styled.div`
  min-width: 0;
  min-height: 0;
  height: 100%;

  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};

  > * {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
  }

  @media ${media.laptop} {
    height: auto;
    grid-template-rows: auto;

    > * {
      height: auto;
    }
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const LeftColumn = styled(Column)`
  grid-template-rows: minmax(0, 0.42fr) minmax(0, 0.58fr);

  @media ${media.laptop} {
    grid-template-rows: auto;
  }
`;

export const RightColumn = styled(Column)`
  grid-template-rows: minmax(0, 0.68fr) minmax(0, 0.32fr);

  @media ${media.laptop} {
    grid-template-rows: auto;
  }
`;
