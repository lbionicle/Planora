'use client';

import { ReactNode } from 'react';

import * as S from './styled';

export interface TabItem<TValue extends string> {
  label: string;
  value: TValue;
}

interface TabsProps<TValue extends string> {
  items: TabItem<TValue>[];
  value: TValue;
  onChange: (value: TValue) => void;
}

export default function Tabs<TValue extends string>({
  items,
  value,
  onChange,
}: TabsProps<TValue>): ReactNode {
  return (
    <S.Wrapper>
      {items.map((item) => (
        <S.Tab
          key={item.value}
          type="button"
          $isActive={item.value === value}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </S.Tab>
      ))}
    </S.Wrapper>
  );
}
