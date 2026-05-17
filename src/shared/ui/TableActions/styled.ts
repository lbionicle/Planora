import styled from 'styled-components';

import { media } from '@/shared/styles';
import Button from '@/shared/ui/Button';

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs2};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs4};
  }
`;

export const ActionButton = styled(Button)`
  width: ${({ theme }) => theme.size.icon.xl4};
  height: ${({ theme }) => theme.size.icon.xl4};
  padding: ${({ theme }) => theme.spacing.xs4};

  svg {
    width: ${({ theme }) => theme.size.icon.sm};
    height: ${({ theme }) => theme.size.icon.sm};
    flex-shrink: 0;
  }

  @media ${media.tablet} {
    width: ${({ theme }) => theme.size.icon.xl2};
    height: ${({ theme }) => theme.size.icon.xl2};
    padding: ${({ theme }) => theme.spacing.xs5};

    svg {
      width: ${({ theme }) => theme.size.icon.xs};
      height: ${({ theme }) => theme.size.icon.xs};
    }
  }
`;
