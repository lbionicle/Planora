import styled, { css } from 'styled-components';

import { media, thinScrollbar } from '@/shared/styles';

import Button from '../Button';
import { ModalSize } from '.';

interface DialogProps {
  $size: ModalSize;
}

function getSizeStyles(size: ModalSize) {
  const styles = {
    sm: css`
      max-width: 420px;
    `,
    md: css`
      max-width: 640px;
    `,
    lg: css`
      max-width: 960px;
    `,
    xl: css`
      max-width: 1120px;
    `,
  };

  return styles[size];
}

export const Overlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl6};
  background-color: ${({ theme }) => theme.modal.backgroundOverlay};
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modalOverlay};

  @media ${media.laptop} {
    padding: ${({ theme }) => theme.spacing.xl4};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xl2};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Dialog = styled.div<DialogProps>`
  ${({ $size }) => getSizeStyles($size)}

  position: relative;
  width: 100%;
  max-height: calc(100dvh - ${({ theme }) => theme.spacing.xl6});
  overflow-x: hidden;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndex.modal};
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  background-color: ${({ theme }) => theme.modal.background};
  box-shadow: ${({ theme }) => theme.shadow.default};

  ${thinScrollbar}

  @media ${media.tablet} {
    max-height: calc(100dvh - ${({ theme }) => theme.spacing.xl3});
    border-radius: ${({ theme }) => theme.borderRadius.xl2};
  }

  @media ${media.mobile} {
    max-height: calc(100dvh - ${({ theme }) => theme.spacing.lg});
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }
`;

export const CloseButton = styled(Button).attrs({
  size: 'xs',
  colorScheme: 'muted',
})`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xl3};
  right: ${({ theme }) => theme.spacing.xl6};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  @media ${media.tablet} {
    top: ${({ theme }) => theme.spacing.lg};
    right: ${({ theme }) => theme.spacing.xl3};
  }

  @media ${media.mobile} {
    top: ${({ theme }) => theme.spacing.xs};
    right: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Header = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing.xl6} ${theme.spacing.xl6} 0 ${theme.spacing.xl6}`};

  @media ${media.tablet} {
    padding: ${({ theme }) =>
      `${theme.spacing.xl3} ${theme.spacing.xl3} 0 ${theme.spacing.xl3}`};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) =>
      `${theme.spacing.lg} ${theme.spacing.lg} 0 ${theme.spacing.lg}`};
  }
`;

export const Title = styled.h2`
  max-width: calc(100% - ${({ theme }) => theme.spacing.xl6});
  margin: 0;
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl6};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: ${({ theme }) => theme.lineHeight.sm};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl5};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl3};
  }
`;

export const Body = styled.div`
  padding: ${({ theme }) => theme.spacing.xl6};

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xl3};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Footer = styled.div`
  padding: ${({ theme }) =>
    `0 ${theme.spacing.xl6} ${theme.spacing.xl6} ${theme.spacing.xl6}`};

  @media ${media.tablet} {
    padding: ${({ theme }) =>
      `0 ${theme.spacing.xl3} ${theme.spacing.xl3} ${theme.spacing.xl3}`};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) =>
      `0 ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.lg}`};
  }
`;

export const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  min-height: 620px;

  @media ${media.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const SplitMain = styled.div`
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.xl6};

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xl3};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

export const SplitAside = styled.aside`
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.xl6};
  background: ${({ theme }) => theme.background.secondary};

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xl3};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;
