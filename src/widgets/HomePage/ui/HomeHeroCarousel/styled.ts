import styled from 'styled-components';

import { media } from '@/shared/styles';

const IMAGE_HEIGHT = {
  default: '500px',
  tablet: '360px',
  mobile: '240px',
};

interface DotProps {
  $isActive: boolean;
}

export const Carousel = styled.section`
  position: relative;
  width: min(100%, ${({ theme }) => theme.container.page});
`;

export const Viewport = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xl3};

  @media ${media.mobile} {
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }
`;

export const Container = styled.div`
  display: flex;
`;

export const Slide = styled.div`
  min-width: 100%;
  flex: 0 0 100%;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${IMAGE_HEIGHT.default};
  overflow: hidden;

  img {
    object-fit: cover;
  }

  @media ${media.tablet} {
    height: ${IMAGE_HEIGHT.tablet};
  }

  @media ${media.mobile} {
    height: ${IMAGE_HEIGHT.mobile};
  }
`;

export const Dots = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl2};
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs2};
  pointer-events: none;

  @media ${media.tablet} {
    bottom: ${({ theme }) => theme.spacing.lg};
  }

  @media ${media.mobile} {
    bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Dot = styled.button<DotProps>`
  width: ${({ theme, $isActive }) =>
    $isActive ? theme.spacing.lg : theme.spacing.xs4};
  height: ${({ theme }) => theme.spacing.xs4};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.carousel.activeDot : theme.carousel.dot};
  cursor: pointer;
  pointer-events: auto;
  transition:
    width ${({ theme }) => theme.transitionDuration.sm},
    background-color ${({ theme }) => theme.transitionDuration.sm};

  &:hover {
    background-color: ${({ theme }) => theme.background.primary};
  }

  @media ${media.mobile} {
    width: ${({ theme, $isActive }) =>
      $isActive ? theme.spacing.sm : theme.spacing.xs5};
    height: ${({ theme }) => theme.spacing.xs5};
  }
`;
