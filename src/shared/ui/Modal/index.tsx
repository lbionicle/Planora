'use client';

import { MouseEvent, PropsWithChildren, ReactNode, useEffect } from 'react';

import { CrossIcon } from '@/shared/ui/Icons';
import Portal from '@/shared/ui/Portal';

import * as S from './styled';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  title?: string;
  size?: ModalSize;
  footer?: ReactNode;
  closeOnOverlayClick?: boolean;
  onClose: () => void;
}

interface ModalSplitLayoutProps extends PropsWithChildren {
  aside: ReactNode;
}

export default function Modal({
  isOpen,
  title,
  size = 'md',
  footer,
  closeOnOverlayClick = true,
  onClose,
  children,
}: ModalProps): ReactNode {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
    if (!closeOnOverlayClick) {
      return;
    }

    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      <S.Overlay onMouseDown={handleOverlayMouseDown}>
        <S.Dialog $size={size}>
          <S.CloseButton onClick={onClose}>
            <CrossIcon />
          </S.CloseButton>

          {title && (
            <S.Header>
              <S.Title>{title}</S.Title>
            </S.Header>
          )}

          <S.Body>{children}</S.Body>

          {footer && <S.Footer>{footer}</S.Footer>}
        </S.Dialog>
      </S.Overlay>
    </Portal>
  );
}

export function ModalSplitLayout({
  children,
  aside,
}: ModalSplitLayoutProps): ReactNode {
  return (
    <S.SplitLayout>
      <S.SplitMain>{children}</S.SplitMain>
      <S.SplitAside>{aside}</S.SplitAside>
    </S.SplitLayout>
  );
}
