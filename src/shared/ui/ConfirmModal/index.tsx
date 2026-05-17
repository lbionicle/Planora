'use client';

import { ReactNode } from 'react';

import ActionButtons from '@/shared/ui/ActionButtons';
import { ButtonColorScheme } from '@/shared/ui/Button';
import Modal from '@/shared/ui/Modal';

import * as S from './styled';

export interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  icon?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColorScheme?: ButtonColorScheme;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  icon,
  confirmText = 'Подтвердить',
  cancelText = 'Отменить',
  confirmColorScheme = 'danger',
  isLoading = false,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      size="sm"
      closeOnOverlayClick={!isLoading}
      onClose={onClose}
    >
      <S.Content>
        {icon && (
          <S.IconWrapper $colorScheme={confirmColorScheme}>
            {icon}
          </S.IconWrapper>
        )}

        <S.TextBlock>
          <S.Title>{title}</S.Title>

          {description && <S.Description>{description}</S.Description>}
        </S.TextBlock>

        <ActionButtons
          primaryText={confirmText}
          secondaryText={cancelText}
          primaryColorScheme={confirmColorScheme}
          isLoading={isLoading}
          loadingText="Выполнение..."
          disabled={isLoading}
          onPrimaryClick={onConfirm}
          onSecondaryClick={onClose}
        />
      </S.Content>
    </Modal>
  );
}
