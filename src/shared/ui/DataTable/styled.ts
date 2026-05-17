import styled, { css } from 'styled-components';

import { media, thinScrollbar } from '@/shared/styles';

interface CellProps {
  $width?: number;
}

function getCellWidthStyles(width?: number) {
  if (!width) {
    return null;
  }

  return css`
    width: ${width}px;
    min-width: ${width}px;
    max-width: ${width}px;
  `;
}

export const Wrapper = styled.div`
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: ${({ theme }) => theme.background.primary};

  ${thinScrollbar}
`;

export const Table = styled.table`
  width: 100%;
  min-width: max-content;
  border-collapse: collapse;
`;

export const HeaderRow = styled.tr`
  border-bottom: ${({ theme }) =>
    `${theme.borderWidth.xs} solid ${theme.border.muted}`};
`;

export const BodyRow = styled.tr`
  border-bottom: ${({ theme }) =>
    `${theme.borderWidth.xs} solid ${theme.border.muted}`};
  transition: background-color ${({ theme }) => theme.transitionDuration.sm};

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.action.primary.backgroundHover};
  }
`;

export const Th = styled.th<CellProps>`
  ${({ $width }) => getCellWidthStyles($width)}

  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs2}`};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  text-align: center;
  white-space: nowrap;

  &:first-child {
    padding: ${({ theme }) => theme.spacing.sm};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs3}`};
    font-size: ${({ theme }) => theme.fontSize.sm};

    &:first-child {
      padding: ${({ theme }) => theme.spacing.xs};
    }
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xs3}`};
    font-size: ${({ theme }) => theme.fontSize.xs};

    &:first-child {
      padding: ${({ theme }) => theme.spacing.xs2};
    }
  }
`;

export const Td = styled.td<CellProps>`
  ${({ $width }) => getCellWidthStyles($width)}

  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs2}`};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;

  &:first-child {
    padding: ${({ theme }) => theme.spacing.sm};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs3}`};
    font-size: ${({ theme }) => theme.fontSize.sm};

    &:first-child {
      padding: ${({ theme }) => theme.spacing.xs};
    }
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xs3}`};
    font-size: ${({ theme }) => theme.fontSize.xs};

    &:first-child {
      padding: ${({ theme }) => theme.spacing.xs2};
    }
  }
`;

export const CellContent = styled.div`
  display: block;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Empty = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs2}`};
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: ${({ theme }) => theme.lineHeight.md};
  text-align: center;

  @media ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs3}`};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xs3}`};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;
