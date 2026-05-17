'use client';

import styled from 'styled-components';

import { media } from '@/shared/styles';

const AVATAR_SIZE = {
  default: '74px',
  laptop: '70px',
  tablet: '68px',
  mobile: '64px',
};

export const Wrapper = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media ${media.mobile} {
    align-items: center;
    flex-direction: column;
  }
`;

export const Avatar = styled.div`
  width: ${AVATAR_SIZE.default};
  height: ${AVATAR_SIZE.default};
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 50%;

  &:hover span {
    visibility: visible;
    pointer-events: auto;
  }

  img {
    object-fit: cover;
  }

  @media ${media.laptop} {
    width: ${AVATAR_SIZE.laptop};
    height: ${AVATAR_SIZE.laptop};
  }

  @media ${media.tablet} {
    width: ${AVATAR_SIZE.tablet};
    height: ${AVATAR_SIZE.tablet};
  }

  @media ${media.mobile} {
    width: ${AVATAR_SIZE.mobile};
    height: ${AVATAR_SIZE.mobile};
  }
`;

export const DeleteAvatarButton = styled.span`
  position: absolute;
  display: flex;
  visibility: hidden;
  align-items: center;
  justify-content: center;
  inset: 0;
  color: ${({ theme }) => theme.fileUpload.deleted.text};
  background-color: ${({ theme }) => theme.fileUpload.deleted.background};
  cursor: pointer;
  pointer-events: none;

  svg {
    width: ${({ theme }) => theme.size.icon.xl2};
    height: ${({ theme }) => theme.size.icon.xl2};
  }

  @media ${media.mobile} {
    svg {
      width: ${({ theme }) => theme.size.icon.xl};
      height: ${({ theme }) => theme.size.icon.xl};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs4};

  @media ${media.mobile} {
    align-items: center;
  }
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl3};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl2};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

export const HelpText = styled.p`
  color: ${({ theme }) => theme.text.muted};
  font-size: ${({ theme }) => theme.fontSize.md};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const FileInput = styled.input`
  display: none;
`;
