'use client';

import { ReactNode } from 'react';

import {
  userRoleLabels,
  userStatusLabels,
} from '@/entities/adminUser/model/constants';
import { AdminUsersFilters } from '@/entities/adminUser/model/types';
import ActiveFilters, { ActiveFilterItem } from '@/shared/ui/ActiveFilters';

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
  const items: ActiveFilterItem[] = [];

  if (filters.role) {
    items.push({
      key: 'role',
      label: userRoleLabels[filters.role],
      onClear: onRoleClear,
    });
  }

  if (filters.status) {
    items.push({
      key: 'status',
      label: userStatusLabels[filters.status],
      onClear: onStatusClear,
    });
  }

  return <ActiveFilters items={items} />;
}
