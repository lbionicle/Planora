'use client';

import { ReactNode, useState } from 'react';

import { ButtonColorScheme, ButtonSize } from '@/shared/ui/Button';
import ConfirmModal from '@/shared/ui/ConfirmModal';

import * as S from './styled';

interface TableActionConfirm {
  title: string;
  description?: string;
  icon?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColorScheme?: ButtonColorScheme;
}

export interface TableActionItem {
  key: string;
  icon: ReactNode;
  colorScheme: ButtonColorScheme;
  title?: string;
  disabled?: boolean;
  hidden?: boolean;
  confirm?: TableActionConfirm;
  onClick: () => void | Promise<void>;
}

interface TableActionsProps {
  actions: TableActionItem[];
  size?: ButtonSize;
  className?: string;
}

export default function TableActions({
  actions,
  size = 'xs',
  className,
}: TableActionsProps) {
  const [selectedAction, setSelectedAction] = useState<TableActionItem | null>(
    null,
  );
  const [isConfirming, setIsConfirming] = useState(false);

  const visibleActions = actions.filter((action) => !action.hidden);

  const handleActionClick = (action: TableActionItem): void => {
    if (action.confirm) {
      setSelectedAction(action);
      return;
    }

    void action.onClick();
  };

  const handleCloseConfirm = (): void => {
    if (isConfirming) {
      return;
    }

    setSelectedAction(null);
  };

  const handleConfirm = async (): Promise<void> => {
    if (!selectedAction) {
      return;
    }

    try {
      setIsConfirming(true);

      await selectedAction.onClick();

      setSelectedAction(null);
    } finally {
      setIsConfirming(false);
    }
  };

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <>
      <S.Actions className={className}>
        {visibleActions.map((action) => (
          <S.ActionButton
            key={action.key}
            size={size}
            colorScheme={action.colorScheme}
            disabled={action.disabled}
            title={action.title}
            type="button"
            onClick={() => handleActionClick(action)}
          >
            {action.icon}
          </S.ActionButton>
        ))}
      </S.Actions>

      {selectedAction?.confirm && (
        <ConfirmModal
          isOpen
          title={selectedAction.confirm.title}
          description={selectedAction.confirm.description}
          icon={selectedAction.confirm.icon}
          confirmText={selectedAction.confirm.confirmText}
          cancelText={selectedAction.confirm.cancelText}
          confirmColorScheme={
            selectedAction.confirm.confirmColorScheme ??
            selectedAction.colorScheme
          }
          isLoading={isConfirming}
          onClose={handleCloseConfirm}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
