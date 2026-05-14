import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl8} 0;

  @media ${media.tablet} {
    margin: ${({ theme }) => theme.spacing.xl5} 0;
  }
`;
