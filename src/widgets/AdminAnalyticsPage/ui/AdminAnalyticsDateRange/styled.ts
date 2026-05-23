import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }

  @media ${media.mobile} {
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs3};
  }
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  white-space: nowrap;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Fields = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs4};

  @media ${media.mobile} {
    width: 100%;
    align-items: stretch;
    flex-direction: column;
  }
`;

export const Separator = styled.span`
  font-size: ${({ theme }) => theme.fontSize.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    display: none;
  }
`;
