import Link from 'next/link';
import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Wrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs5};
  color: ${({ theme }) => theme.text.accent};
`;

export const IconWrapper = styled.div`
  width: ${({ theme }) => theme.size.icon.xl6};
  height: ${({ theme }) => theme.size.icon.xl6};
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${media.tablet} {
    width: ${({ theme }) => theme.size.icon.xl4};
    height: ${({ theme }) => theme.size.icon.xl4};
  }
`;
export const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    display: none;
  }
`;
