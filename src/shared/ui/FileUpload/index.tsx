'use client';

import { ComponentPropsWithRef, ReactNode, useId } from 'react';

import * as S from './styled';

interface FileUploadProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'type' | 'value'
> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  fileName?: string;
  placeholder?: string;
}

export default function FileUpload({
  ref,
  label,
  error,
  icon,
  fileName,
  placeholder = 'Загрузите файл',
  id,
  name,
  disabled,
  ...props
}: FileUploadProps) {
  const generatedId = useId();

  const inputId = id ?? name ?? generatedId;
  const hasError = Boolean(error);

  return (
    <S.Wrapper>
      {label && <S.Label htmlFor={inputId}>{label}</S.Label>}

      <S.Field
        htmlFor={inputId}
        $hasError={hasError}
        $isDisabled={Boolean(disabled)}
      >
        {icon && <S.Icon>{icon}</S.Icon>}

        <S.Text>{fileName || placeholder}</S.Text>

        <S.Input
          ref={ref}
          id={inputId}
          name={name}
          disabled={disabled}
          type="file"
          {...props}
        />
      </S.Field>

      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
}
