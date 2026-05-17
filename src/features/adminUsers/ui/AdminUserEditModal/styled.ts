import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs4};
  }
`;

export const Empty = styled.div`
  gap: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  text-align: center;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
