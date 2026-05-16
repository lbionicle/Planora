import styled from 'styled-components';

import { DropdownAlign } from '.';

interface ContentProps {
  $align: DropdownAlign;
}

export const Root = styled.div`
  position: relative;
  display: inline-flex;
`;

export const Content = styled.div<ContentProps>`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  ${({ $align }) => ($align === 'end' ? 'right: 0;' : 'left: 0;')}

  z-index: ${({ theme }) => theme.zIndex.dropdown};
  padding: ${({ theme }) => theme.spacing.xs4};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: ${({ theme }) => theme.shadow.default};
`;
