'use client';

import { ReactNode } from 'react';

import SearchInput from '@/shared/ui/SearchInput';

import * as S from './styled';

interface PageToolbarSearch {
  value: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  onChange: (value: string) => void;
}

interface PageToolbarProps {
  search?: PageToolbarSearch;
  action?: ReactNode;
}

export default function PageToolbar({
  search,
  action,
}: PageToolbarProps): ReactNode {
  if (!search && !action) {
    return null;
  }

  return (
    <S.Toolbar>
      {search && (
        <SearchInput
          value={search.value}
          placeholder={search.placeholder}
          onChange={search.onChange}
        />
      )}

      {action}
    </S.Toolbar>
  );
}
