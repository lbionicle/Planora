import styled, { css } from 'styled-components';

import { DividerOrientation } from '.';

interface DividerProps {
  $orientation: DividerOrientation;
}

function getOrientationStyles(orientation: DividerOrientation) {
  if (orientation === 'vertical') {
    return css`
      width: ${({ theme }) => theme.borderWidth.xs};
      min-height: 100%;
    `;
  }

  return css`
    width: 100%;
    height: ${({ theme }) => theme.borderWidth.xs};
  `;
}

export const Divider = styled.div<DividerProps>`
  ${({ $orientation }) => getOrientationStyles($orientation)}

  flex-shrink: 0;
  background: ${({ theme }) => theme.border.muted};
`;
