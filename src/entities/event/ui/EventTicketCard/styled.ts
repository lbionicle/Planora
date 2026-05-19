import Link from 'next/link';
import styled from 'styled-components';

import { media } from '@/shared/styles';

import EventCardActions from '../EventCardActions';

const IMAGE_HEIGHT = {
  default: '180px',
  tablet: '160px',
  mobile: '140px',
};

export const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.shadow.default};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.xl2};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }
`;

export const HeaderActions = styled(EventCardActions)`
  && {
    align-self: start;
    justify-self: end;
    justify-content: flex-end;
    margin-top: 0;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${IMAGE_HEIGHT.default};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.background.secondary};

  img {
    object-fit: cover;
  }

  @media ${media.tablet} {
    height: ${IMAGE_HEIGHT.tablet};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  @media ${media.mobile} {
    height: ${IMAGE_HEIGHT.mobile};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template: 1fr / 1fr auto;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Title = styled.h3`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
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

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs2};

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }
`;

export const ContactLink = styled(Link)`
  display: inline-flex;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl6}`};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.text.accent};
  background-color: transparent;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-decoration: none;
  text-decoration: underline;
  text-underline-offset: ${({ theme }) => theme.spacing.xs7};
  cursor: pointer;

  @media ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xl4}`};
    font-size: ${({ theme }) => theme.fontSize.md};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xl2}`};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
