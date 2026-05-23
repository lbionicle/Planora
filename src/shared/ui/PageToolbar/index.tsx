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
  bottom?: ReactNode;
}

export default function PageToolbar({
  search,
  action,
  bottom,
}: PageToolbarProps): ReactNode {
  if (!search && !action && !bottom) {
    return null;
  }

  return (
    <S.Wrapper>
      {(search || action) && (
        <S.Toolbar>
          {search && (
            <SearchInput
              value={search.value}
              placeholder={search.placeholder}
              onChange={search.onChange}
            />
          )}

          {action && <S.Actions>{action}</S.Actions>}
        </S.Toolbar>
      )}

      {bottom && <S.Bottom>{bottom}</S.Bottom>}
    </S.Wrapper>
  );
}
