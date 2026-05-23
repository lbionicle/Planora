import styled, { createGlobalStyle, css } from 'styled-components';

import { media } from '@/shared/styles';
import { InputVariant } from '@/shared/ui/Input';

interface DateButtonProps {
  $hasError: boolean;
  $isDisabled: boolean;
  $variant: InputVariant;
}

function getFieldVariantStyles(variant: InputVariant, isDisabled: boolean) {
  if (isDisabled) {
    return css`
      background-color: ${({ theme }) => theme.background.muted};
    `;
  }

  if (variant === 'default') {
    return css`
      background-color: ${({ theme }) => theme.background.primary};
    `;
  }

  return css`
    background-color: transparent;
  `;
}

export const DatePickerStyles = createGlobalStyle`
  .planora-datepicker-wrapper {
    width: 100%;
  }

  .planora-datepicker-calendar,
  .planora-datepicker-calendar * {
    font-family: ${({ theme }) => theme.fontFamily.inter};
  }
  
  .planora-datepicker-popper {
    z-index: ${({ theme }) => theme.zIndex.dropdown};
  }
  
  .planora-datepicker-popper .react-datepicker__triangle {
    display: none;
  }
  
  .planora-datepicker-popper .react-datepicker__triangle::before,
  .planora-datepicker-popper .react-datepicker__triangle::after {
    display: none;
  }

  .planora-datepicker-calendar {
    border: ${({ theme }) =>
      `${theme.borderWidth.xs} solid ${theme.border.primary}`};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background-color: ${({ theme }) => theme.background.primary};
    box-shadow: ${({ theme }) => theme.shadow.md};
    overflow: hidden;
  }

  .react-datepicker-popper {
    z-index: ${({ theme }) => theme.zIndex.dropdown};
  }

  .react-datepicker__header {
    border-bottom: ${({ theme }) =>
      `${theme.borderWidth.xs} solid ${theme.border.primary}`};
    background-color: ${({ theme }) => theme.background.primary};
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header {
    color: ${({ theme }) => theme.text.primary};
    font-size: ${({ theme }) => theme.fontSize.md};
    font-family: ${({ theme }) => theme.fontFamily.inter};
    font-weight: ${({ theme }) => theme.fontWeight.medium};

    @media ${media.tablet} {
        font-size: ${({ theme }) => theme.fontSize.sm};
    }

    @media ${media.mobile} {
        font-size: ${({ theme }) => theme.fontSize.xs};
    }
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: ${({ theme }) => theme.text.primary};
    font-size: ${({ theme }) => theme.fontSize.md};

    @media ${media.tablet} {
        font-size: ${({ theme }) => theme.fontSize.sm};
    }

    @media ${media.mobile} {
        font-size: ${({ theme }) => theme.fontSize.xs};
    }
  }

  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover,
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item:hover {
    background-color: ${({ theme }) => theme.action.info.background};
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item--selected {
    color: ${({ theme }) => theme.action.accent.text};
    background-color: ${({ theme }) => theme.action.accent.background};
  }

  .react-datepicker__time-container,
  .react-datepicker__time-container *,
  .react-datepicker__time,
  .react-datepicker__time-box,
  .react-datepicker__time-list,
  .react-datepicker__time-list-item {
    font-family: ${({ theme }) => theme.fontFamily.inter};
  }

  .react-datepicker__time-list-item {
    font-size: ${({ theme }) => theme.fontSize.xs};
    line-height: ${({ theme }) => theme.lineHeight.xs};
  }

  .react-datepicker__day--disabled {
    color: ${({ theme }) => theme.text.muted};
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.text.secondary};
  }

  .react-datepicker__time-container {
    border-left: ${({ theme }) =>
      `${theme.borderWidth.xs} solid ${theme.border.primary}`};
  }

  .react-datepicker__time-container .react-datepicker__time {
    background-color: ${({ theme }) => theme.background.primary};
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs6};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const DateField = styled.input<DateButtonProps>`
  ${({ $variant, $isDisabled }) => getFieldVariantStyles($variant, $isDisabled)}

  width: 100%;
  border: ${({ theme }) => theme.borderWidth.xs} solid;
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.border.danger : theme.border.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.text.primary};
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSize.md};
  outline: none;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};

  &::placeholder {
    color: ${({ theme }) => theme.text.muted};
  }

  &:focus {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.border.danger : theme.border.accent};
  }

  &:disabled {
    color: ${({ theme }) => theme.text.muted};
  }

  @media ${media.tablet} {
    padding: ${({ theme }) => `${theme.spacing.xs2} ${theme.spacing.xs}`};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.status.danger};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.sm};
  margin-top: ${({ theme }) => theme.spacing.xs6};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs3};
  }
`;
