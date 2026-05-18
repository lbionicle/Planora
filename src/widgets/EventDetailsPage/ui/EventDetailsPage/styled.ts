import Link from 'next/link';
import styled from 'styled-components';

import { media } from '@/shared/styles';
import Button from '@/shared/ui/Button';

const IMAGE_HEIGHT = {
  default: '400px',
  tablet: '320px',
  mobile: '210px',
};

export const Hero = styled.div`
  position: relative;
  width: 100%;
  height: ${IMAGE_HEIGHT.default};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  background-color: ${({ theme }) => theme.background.secondary};

  img {
    object-fit: cover;
  }

  @media ${media.tablet} {
    height: ${IMAGE_HEIGHT.tablet};
  }

  @media ${media.mobile} {
    height: ${IMAGE_HEIGHT.mobile};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 440px;
  align-items: start;
  gap: ${({ theme }) => theme.spacing.xl8};

  @media ${media.laptop} {
    grid-template-columns: minmax(0, 1fr) 320px;
  }

  @media ${media.tablet} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl6};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xl2};
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl4};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl2};
    order: 2;
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl6};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl5};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl3};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.borderWidth.xs};
  background-color: ${({ theme }) => theme.border.secondary};
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }
`;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl3};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl2};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};
  white-space: pre-line;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const LocationLayout = styled.div`
  display: grid;
  grid-template: 1fr / auto minmax(240px, 1fr);
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing.xl4};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl2};
  }

  @media ${media.mobile} {
    grid-template: 1fr / 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const MapPreviewLink = styled(Link)`
  position: relative;
  width: 100%;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xl};

  img {
    object-fit: cover;
    filter: ${({ theme }) => `blur(${theme.spacing.xs5})`};
  }

  @media ${media.tablet} {
    min-height: 180px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

export const MapButton = styled(Button).attrs({
  colorScheme: 'secondary',
})`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.text.accent};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.action.secondary.background};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.action.secondary.background};
  }
`;

export const Aside = styled.aside`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    position: static;
    gap: ${({ theme }) => theme.spacing.sm};
    order: 1;
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs2};
  }
`;

export const ActionCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.shadow.default};

  @media ${media.laptop} {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.xl2};
  }
`;

export const ActionButton = styled(Button)`
  @media ${media.laptop} {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xl4}`};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const ActionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs4};
  }
`;

export const Price = styled(SectionTitle)``;

export const ActionDate = styled(Text)``;

export const PlacesText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs3};
  }
`;

export const PlacesNumber = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs2};
  }
`;

export const State = styled.div`
  width: min(100%, ${({ theme }) => theme.container.page});
  font-size: ${({ theme }) => theme.fontSize.md};
`;
