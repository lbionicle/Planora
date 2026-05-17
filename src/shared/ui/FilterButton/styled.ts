import styled from 'styled-components';

import { media } from '@/shared/styles';

import Button from '../Button';

export const FilterActionButton = styled(Button).attrs({
  size: 'sm',
  colorScheme: 'accent',
})`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: ${({ theme }) => theme.spacing.xs2};

  svg {
    width: ${({ theme }) => theme.size.icon.xl};
    height: ${({ theme }) => theme.size.icon.xl};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xs3};

    svg {
      width: ${({ theme }) => theme.size.icon.lg};
      height: ${({ theme }) => theme.size.icon.lg};
    }
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.xs3};

    svg {
      width: ${({ theme }) => theme.size.icon.md};
      height: ${({ theme }) => theme.size.icon.md};
    }
  }
`;
