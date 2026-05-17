'use client';

import { ReactNode } from 'react';

import {
  userRoleLabels,
  userStatusLabels,
} from '@/entities/adminUser/model/constants';
import { AdminUsersFilters } from '@/entities/adminUser/model/types';
import { CrossIcon } from '@/shared/ui/Icons';

import * as S from './styled';

interface AdminUsersActiveFiltersProps {
  filters: AdminUsersFilters;
  onRoleClear: () => void;
  onStatusClear: () => void;
}

export default function AdminUsersActiveFilters({
  filters,
  onRoleClear,
  onStatusClear,
}: AdminUsersActiveFiltersProps): ReactNode {
  if (!filters.role && !filters.status) {
    return null;
  }

  return (
    <S.Wrapper>
      {filters.role && (
        <S.Chip type="button" onClick={onRoleClear}>
          {userRoleLabels[filters.role]}
          <CrossIcon />
        </S.Chip>
      )}

      {filters.status && (
        <S.Chip type="button" onClick={onStatusClear}>
          {userStatusLabels[filters.status]}
          <CrossIcon />
        </S.Chip>
      )}
    </S.Wrapper>
  );
}
