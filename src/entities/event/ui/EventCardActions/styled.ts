import styled, { css } from 'styled-components';

import { media } from '@/shared/styles';

type ActionButtonTone = 'default' | 'favorite';

interface ActionButtonProps {
  $tone: ActionButtonTone;
  $isActive: boolean;
}

function getActionButtonStyles(tone: ActionButtonTone, isActive: boolean) {
  if (tone === 'favorite' && isActive) {
    return css`
      color: ${({ theme }) => theme.text.accent};

      &:hover:not(:disabled) {
        color: ${({ theme }) => theme.action.danger.text};
        border-color: ${({ theme }) => theme.action.danger.border};
      }
    `;
  }

  if (tone === 'favorite') {
    return css`
      color: ${({ theme }) => theme.text.secondary};

      &:hover:not(:disabled) {
        color: ${({ theme }) => theme.text.accent};
        border-color: ${({ theme }) => theme.action.info.border};
      }
    `;
  }

  return css`
    color: ${({ theme }) => theme.text.secondary};

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.text.accent};
      border-color: ${({ theme }) => theme.action.info.border};
    }
  `;
}

export const Actions = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: auto;
  z-index: 2;

  @media ${media.tablet} {
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media ${media.mobile} {
    gap: ${({ theme }) => theme.spacing.xs2};
  }
`;

export const ActionButton = styled.button.attrs({
  type: 'button',
})<ActionButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs3};
  border: ${({ theme }) =>
    `${theme.borderWidth.xs} solid ${theme.border.muted}`};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.background.primary};
  cursor: pointer;

  transition:
    color ${({ theme }) => theme.transitionDuration.sm},
    background-color ${({ theme }) => theme.transitionDuration.sm},
    border-color ${({ theme }) => theme.transitionDuration.sm};

  ${({ $tone, $isActive }) => getActionButtonStyles($tone, $isActive)}

  &:disabled {
    background-color: ${({ theme }) => theme.action.disabled.background};
    color: ${({ theme }) => theme.action.disabled.text};
    border-color: ${({ theme }) => theme.action.disabled.border};
    cursor: not-allowed;
  }

  svg {
    width: ${({ theme }) => theme.size.icon.md};
    height: ${({ theme }) => theme.size.icon.md};
  }

  @media ${media.tablet} {
    svg {
      width: ${({ theme }) => theme.size.icon.sm};
      height: ${({ theme }) => theme.size.icon.sm};
    }
  }
`;
