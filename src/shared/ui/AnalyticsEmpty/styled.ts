import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Empty = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  text-align: center;

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
