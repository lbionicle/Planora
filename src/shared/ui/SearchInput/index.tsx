'use client';

import { ComponentPropsWithRef, useId } from 'react';

import { SearchIcon } from '../Icons';
import Input from '../Input';

interface SearchInputProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'onChange'
> {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({
  ref,
  value,
  id,
  name,
  placeholder = 'Введите ключевое слово для поиска',
  onChange,
  ...props
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? name ?? generatedId;

  return (
    <Input
      ref={ref}
      id={inputId}
      name={name}
      value={value}
      leftIcon={<SearchIcon />}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      variant="default"
      {...props}
    />
  );
}
