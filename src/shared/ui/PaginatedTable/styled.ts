import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Card = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border: ${({ theme }) =>
    `${theme.borderWidth.xs} solid ${theme.border.muted}`};
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  background: ${({ theme }) => theme.background.primary};

  @media ${media.laptop} {
    border-radius: ${({ theme }) => theme.borderRadius.xl2};
  }

  @media ${media.tablet} {
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }

  @media ${media.mobile} {
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;
