import styled, { css } from 'styled-components';

import { media } from '@/shared/styles';

interface TextProps {
  $truncate: boolean;
}

export const List = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs4};
  }
`;

export const Item = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs6};
  color: ${({ theme }) => theme.eventInfo.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Icon = styled.span`
  width: ${({ theme }) => theme.size.icon.md};
  height: ${({ theme }) => theme.size.icon.md};
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.eventInfo.icon};

  svg {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
  }

  @media ${media.tablet} {
    width: ${({ theme }) => theme.size.icon.sm};
    height: ${({ theme }) => theme.size.icon.sm};
  }

  @media ${media.mobile} {
    width: ${({ theme }) => theme.size.icon.xs};
    height: ${({ theme }) => theme.size.icon.xs};
  }
`;

export const Text = styled.span<TextProps>`
  min-width: 0;

  ${({ $truncate }) =>
    $truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;
