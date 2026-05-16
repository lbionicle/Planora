import { css } from 'styled-components';

export const thinScrollbar = css`
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) =>
    `${theme.scrollbar.thumb} ${theme.scrollbar.track}`};

  &::-webkit-scrollbar {
    width: ${({ theme }) => theme.size.scrollbar.width};
    height: ${({ theme }) => theme.size.scrollbar.height};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbar.track};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: ${({ theme }) => theme.borderRadius.xs2};
    background: ${({ theme }) => theme.scrollbar.thumb};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollbar.thumbHover};
  }
`;
