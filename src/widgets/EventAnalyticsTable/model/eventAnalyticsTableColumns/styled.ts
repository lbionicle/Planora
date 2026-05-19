import styled from 'styled-components';

import { EventStatus } from '@/entities/event/model/types';

interface StatusProps {
  $status: EventStatus;
}

function getStatusColor(status: EventStatus) {
  if (status === EventStatus.PUBLISHED) {
    return 'success';
  }

  if (status === EventStatus.CANCELLED) {
    return 'danger';
  }

  if (status === EventStatus.COMPLETED) {
    return 'neutral';
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
