import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Page = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl6};

  @media ${media.laptop} {
    gap: ${({ theme }) => theme.spacing.xl4};
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl2};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl6};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: ${({ theme }) => theme.lineHeight.sm};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl5};
  }
`;
