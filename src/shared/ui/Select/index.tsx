'use client';

import {
  ComponentPropsWithRef,
  SelectHTMLAttributes,
  useId,
  useState,
} from 'react';

import { InputVariant } from '@/shared/ui/Input';

import { ArrowBottomIcon } from '../Icons';
import * as S from './styled';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<
  ComponentPropsWithRef<'select'>,
  'children'
> {
  label?: string;
  options: SelectOption[];
  error?: string;
  variant?: InputVariant;
  fullWidth?: boolean;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

export default function Select({
  ref,
  id,
  name,
  label,
  options,
  disabled,
  error,
  variant = 'transparent',
  fullWidth = true,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  onPointerDown,
  onKeyDown,
  onValueChange,
  ...props
}: SelectProps) {
  const generatedId = useId();

  const selectId = id ?? name ?? generatedId;
  const hasError = Boolean(error);
  const isDisabled = Boolean(disabled);

  const [isOpen, setIsOpen] = useState(false);

  const handlePointerDown: SelectHTMLAttributes<HTMLSelectElement>['onPointerDown'] =
    (event) => {
      if (!isDisabled) {
        setIsOpen((currentValue) => !currentValue);
      }

      onPointerDown?.(event);
    };

  const handleKeyDown: SelectHTMLAttributes<HTMLSelectElement>['onKeyDown'] = (
    event,
  ) => {
    if (!isDisabled) {
      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        setIsOpen(true);
      }

      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    onKeyDown?.(event);
  };

  const handleChange: SelectHTMLAttributes<HTMLSelectElement>['onChange'] = (
    event,
  ) => {
    setIsOpen(false);

    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  const handleFocus: SelectHTMLAttributes<HTMLSelectElement>['onFocus'] = (
    event,
  ) => {
    onFocus?.(event);
  };

  const handleBlur: SelectHTMLAttributes<HTMLSelectElement>['onBlur'] = (
    event,
  ) => {
    setIsOpen(false);
    onBlur?.(event);
  };

  return (
    <S.Wrapper $fullWidth={fullWidth}>
      {label && <S.Label htmlFor={selectId}>{label}</S.Label>}

      <S.Field $hasError={hasError} $isDisabled={isDisabled} $variant={variant}>
        <S.Select
          ref={ref}
          id={selectId}
          name={name}
          disabled={disabled}
          $hasError={hasError}
          $isDisabled={isDisabled}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option
              key={option.value || option.label}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </S.Select>

        <S.Arrow $isOpen={isOpen} $isDisabled={isDisabled}>
          <ArrowBottomIcon />
        </S.Arrow>
      </S.Field>

      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
}
