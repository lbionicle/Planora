'use client';

import { ComponentPropsWithRef, useId } from 'react';

import { InputVariant } from '@/shared/ui/Input';

import * as S from './styled';

interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  error?: string;
  variant?: InputVariant;
}

export default function Textarea({
  ref,
  label,
  error,
  id,
  name,
  disabled,
  variant = 'transparent',
  ...props
}: TextareaProps) {
  const generatedId = useId();

  const textareaId = id ?? name ?? generatedId;
  const hasError = Boolean(error);
  const isDisabled = Boolean(disabled);

  return (
    <S.Wrapper>
      {label && <S.Label htmlFor={textareaId}>{label}</S.Label>}

      <S.Field
        htmlFor={textareaId}
        $hasError={hasError}
        $isDisabled={isDisabled}
        $variant={variant}
      >
        <S.Textarea
          ref={ref}
          id={textareaId}
          name={name}
          disabled={disabled}
          {...props}
        />
      </S.Field>

      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
}
