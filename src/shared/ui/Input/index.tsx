'use client';

import { ComponentPropsWithRef, ReactNode, useId } from 'react';

import * as S from './styled';

export type InputVariant = 'default' | 'transparent';

interface InputProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  error?: string;
  variant?: InputVariant;
}

export default function Input({
  ref,
  leftIcon,
  rightElement,
  label,
  error,
  id,
  name,
  disabled,
  variant = 'transparent',
  ...props
}: InputProps) {
  const generatedId = useId();

  const inputId = id ?? name ?? generatedId;
  const hasError = Boolean(error);
  const isDisabled = Boolean(disabled);

  return (
    <S.Wrapper>
      {label && <S.Label htmlFor={inputId}>{label}</S.Label>}

      <S.Field
        htmlFor={inputId}
        $hasError={hasError}
        $isDisabled={isDisabled}
        $variant={variant}
      >
        {leftIcon && <S.LeftIcon>{leftIcon}</S.LeftIcon>}

        <S.Input
          ref={ref}
          id={inputId}
          name={name}
          disabled={disabled}
          $hasLeftIcon={Boolean(leftIcon)}
          $hasRightElement={Boolean(rightElement)}
          {...props}
        />

        {rightElement && <S.RightElement>{rightElement}</S.RightElement>}
      </S.Field>

      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
}
