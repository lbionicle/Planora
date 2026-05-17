import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;
