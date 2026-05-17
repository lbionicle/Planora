'use client';

import { ReactNode } from 'react';

import { CrossIcon } from '@/shared/ui/Icons';

import * as S from './styled';

export interface ActiveFilterItem {
  key: string;
  label: string;
  onClear: () => void;
}

interface ActiveFiltersProps {
  items: ActiveFilterItem[];
}

export default function ActiveFilters({
  items,
}: ActiveFiltersProps): ReactNode {
  if (items.length === 0) {
    return null;
  }

  return (
    <S.Wrapper>
      {items.map((item) => (
        <S.Chip key={item.key} type="button" onClick={item.onClear}>
          {item.label}
          <CrossIcon />
        </S.Chip>
      ))}
    </S.Wrapper>
  );
}
