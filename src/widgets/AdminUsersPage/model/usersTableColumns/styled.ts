import styled from 'styled-components';

import { UserStatus } from '@/entities/user/model/types';

interface StatusProps {
  $status: UserStatus;
}

function getStatusColor(status: UserStatus) {
  if (status === UserStatus.ACTIVE) {
    return 'success';
  }

  if (status === UserStatus.BLOCKED || status === UserStatus.REJECTED) {
    return 'danger';
  }

  return 'info';
}

export const Status = styled.span<StatusProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.xs6} ${theme.spacing.xs4}`};
  border-radius: ${({ theme }) => theme.borderRadius.xl3};
  color: ${({ theme, $status }) => theme.action[getStatusColor($status)].text};
  background-color: ${({ theme, $status }) =>
    theme.action[getStatusColor($status)].background};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`;
