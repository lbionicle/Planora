import Link from 'next/link';
import styled from 'styled-components';

import { media } from '@/shared/styles';

const CARD_WIDTH = {
  default: '340px',
  tablet: '300px',
  mobile: '280px',
};

const IMAGE_HEIGHT = {
  default: '240px',
  tablet: '200px',
  mobile: '180px',
};

export const Card = styled.article`
  position: relative;
  min-width: ${CARD_WIDTH.default};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.shadow.default};

  @media ${media.tablet} {
    min-width: ${CARD_WIDTH.tablet};
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.xl2};
  }

  @media ${media.mobile} {
    min-width: ${CARD_WIDTH.mobile};
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }
`;

export const CardLink = styled(Link)`
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${IMAGE_HEIGHT.default};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.background.secondary};

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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs2};
  }
`;

export const Title = styled.h3`
  overflow: hidden;
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

export const InfoList = styled.div`
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

export const InfoItem = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.eventInfo.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  gap: ${({ theme }) => theme.spacing.xs6};
  line-height: ${({ theme }) => theme.lineHeight.md};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

export const InfoItemIcon = styled.span`
  width: ${({ theme }) => theme.size.icon.md};
  height: ${({ theme }) => theme.size.icon.md};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.eventInfo.icon};

  svg {
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
