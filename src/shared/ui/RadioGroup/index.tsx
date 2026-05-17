'use client';

import { ComponentPropsWithRef } from 'react';

import * as S from './styled';

export interface RadioOption<TValue extends string> {
  label: string;
  value: TValue;
}

interface RadioGroupProps<TValue extends string> extends Omit<
  ComponentPropsWithRef<'div'>,
  'onChange'
> {
  name: string;
  value: TValue;
  options: RadioOption<TValue>[];
  onChange: (value: TValue) => void;
}

export default function RadioGroup<TValue extends string>({
  name,
  value,
  options,
  onChange,
  ...props
}: RadioGroupProps<TValue>) {
  return (
    <S.Group {...props}>
      {options.map((option) => (
        <S.Option key={option.value}>
          <S.Input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />

          <S.Control />
          <S.Label>{option.label}</S.Label>
        </S.Option>
      ))}
    </S.Group>
  );
}
