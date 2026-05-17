import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Card = styled.section`
  width: 100%;
  max-width: ${({ theme }) => `min(${theme.container.authForm}, 100%)`};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl6};
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.shadow.default};

  @media ${media.tablet} {
    padding: ${({ theme }) => theme.spacing.xl2};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.xl8};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl7};
  }
`;
