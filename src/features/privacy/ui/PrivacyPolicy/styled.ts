'use client';

import styled from 'styled-components';

import { media } from '@/shared/styles';

const DOCUMENT_MAX_WIDTH = '1024px';

export const Document = styled.main`
  display: flex;
  width: 100%;
  max-width: ${DOCUMENT_MAX_WIDTH};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl6};
  padding: ${({ theme }) => theme.spacing.xl6};
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.shadow.default};

  @media ${media.laptop} {
    gap: ${({ theme }) => theme.spacing.xl4};
    padding: ${({ theme }) => theme.spacing.xl4};
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl2};
    padding: ${({ theme }) => theme.spacing.xl3};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.xl2};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: ${({ theme }) => theme.spacing.sm};

  @media ${media.laptop} {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs2};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs3};
  }
`;

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl8};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  @media ${media.laptop} {
    font-size: ${({ theme }) => theme.fontSize.xl7};
  }

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl6};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl5};
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl6};

  @media ${media.laptop} {
    gap: ${({ theme }) => theme.spacing.xl4};
  }

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xl2};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export const Section = styled.section``;

export const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-size: ${({ theme }) => theme.fontSize.xl6};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;

  @media ${media.laptop} {
    font-size: ${({ theme }) => theme.fontSize.xl5};
    margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  }

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl3};
    margin: 0 0 ${({ theme }) => theme.spacing.xs2} 0;
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin: 0 0 ${({ theme }) => theme.spacing.xs2} 0;
  }
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.xl3};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;

  &:last-child {
    margin-bottom: 0;
  }

  @media ${media.laptop} {
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
    margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.md};
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }
`;
