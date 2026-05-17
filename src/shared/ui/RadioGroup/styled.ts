import styled from 'styled-components';

import { media } from '@/shared/styles';

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs2};
`;

export const Option = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs4};
  color: ${({ theme }) => theme.text.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  cursor: pointer;

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export const Control = styled.span`
  position: relative;
  width: ${({ theme }) => theme.size.icon.md};
  height: ${({ theme }) => theme.size.icon.md};
  flex-shrink: 0;
  border: ${({ theme }) =>
    `${theme.borderWidth.xs} solid ${theme.border.primary}`};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.background.primary};

  ${Input}:checked + & {
    border-color: ${({ theme }) => theme.border.accent};
  }

  ${Input}:checked + &::after {
    content: '';
    position: absolute;
    inset: ${({ theme }) => theme.spacing.xs6};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.background.accent};
  }

  @media ${media.tablet} {
    width: ${({ theme }) => theme.size.icon.sm};
    height: ${({ theme }) => theme.size.icon.sm};
  }
`;

export const Label = styled.span``;
