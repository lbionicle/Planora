import { UserRole, UserStatus } from '@/entities/user/model/types';

import { AdminUsersFilters } from './types';

export const DEFAULT_ADMIN_USERS_FILTERS: AdminUsersFilters = {
  role: null,
  status: null,
};

export const userRoleLabels: Record<UserRole, string> = {
  [UserRole.PARTICIPANT]: 'Участник',
  [UserRole.ORGANIZER]: 'Организатор',
  [UserRole.ADMIN]: 'Администратор',
};

export const userStatusLabels: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'Активен',
  [UserStatus.PENDING_APPROVAL]: 'В ожидании',
  [UserStatus.REJECTED]: 'Отклонён',
  [UserStatus.BLOCKED]: 'Заблокирован',
};
