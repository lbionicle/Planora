'use client';

import { ReactNode, useState } from 'react';

import {
  DEFAULT_ADMIN_USERS_FILTERS,
  userRoleLabels,
  userStatusLabels,
} from '@/entities/adminUser/model/constants';
import { AdminUsersFilters } from '@/entities/adminUser/model/types';
import { UserRole, UserStatus } from '@/entities/user/model/types';
import ActionButtons from '@/shared/ui/ActionButtons';
import Modal from '@/shared/ui/Modal';
import RadioGroup, { RadioOption } from '@/shared/ui/RadioGroup';

import * as S from './styled';

type RoleFilterValue = UserRole | 'ALL';
type StatusFilterValue = UserStatus | 'ALL';

interface AdminUsersFiltersModalProps {
  isOpen: boolean;
  initialFilters: AdminUsersFilters;
  onClose: () => void;
  onApply: (filters: AdminUsersFilters) => void;
}

const roleOptions: RadioOption<RoleFilterValue>[] = [
  { label: 'Все роли', value: 'ALL' },
  { label: userRoleLabels[UserRole.PARTICIPANT], value: UserRole.PARTICIPANT },
  { label: userRoleLabels[UserRole.ORGANIZER], value: UserRole.ORGANIZER },
];

const statusOptions: RadioOption<StatusFilterValue>[] = [
  { label: 'Все статусы', value: 'ALL' },
  { label: userStatusLabels[UserStatus.ACTIVE], value: UserStatus.ACTIVE },
  {
    label: userStatusLabels[UserStatus.PENDING_APPROVAL],
    value: UserStatus.PENDING_APPROVAL,
  },
  { label: userStatusLabels[UserStatus.REJECTED], value: UserStatus.REJECTED },
  { label: userStatusLabels[UserStatus.BLOCKED], value: UserStatus.BLOCKED },
];

function getRoleValue(role: UserRole | null): RoleFilterValue {
  return role ?? 'ALL';
}

function getStatusValue(status: UserStatus | null): StatusFilterValue {
  return status ?? 'ALL';
}

export default function AdminUsersFiltersModal({
  isOpen,
  initialFilters,
  onClose,
  onApply,
}: AdminUsersFiltersModalProps): ReactNode {
  const [filters, setFilters] = useState<AdminUsersFilters>(initialFilters);

  const handleRoleChange = (value: RoleFilterValue): void => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      role: value === 'ALL' ? null : value,
    }));
  };

  const handleStatusChange = (value: StatusFilterValue): void => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      status: value === 'ALL' ? null : value,
    }));
  };

  const handleReset = (): void => {
    setFilters(DEFAULT_ADMIN_USERS_FILTERS);
  };

  const handleApply = (): void => {
    onApply(filters);
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Фильтры"
      size="sm"
      onClose={onClose}
      footer={
        <ActionButtons
          primaryText="Применить"
          secondaryText="Сбросить"
          onPrimaryClick={handleApply}
          onSecondaryClick={handleReset}
        />
      }
    >
      <S.Content>
        <S.Section>
          <S.SectionTitle>Роль пользователя</S.SectionTitle>
          <RadioGroup
            name="admin-user-role"
            value={getRoleValue(filters.role)}
            options={roleOptions}
            onChange={handleRoleChange}
          />
        </S.Section>

        <S.Section>
          <S.SectionTitle>Статус пользователя</S.SectionTitle>

          <RadioGroup
            name="admin-user-status"
            value={getStatusValue(filters.status)}
            options={statusOptions}
            onChange={handleStatusChange}
          />
        </S.Section>
      </S.Content>
    </Modal>
  );
}
