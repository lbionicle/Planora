'use client';

import {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as S from './styled';

export type DropdownAlign = 'start' | 'end';

interface DropdownTriggerParams {
  isOpen: boolean;
  triggerProps: ButtonHTMLAttributes<HTMLButtonElement>;
}

interface DropdownContentParams {
  close: () => void;
}

interface DropdownProps {
  trigger: (params: DropdownTriggerParams) => ReactNode;
  children: (params: DropdownContentParams) => ReactNode;
  align?: DropdownAlign;
}

export default function Dropdown({
  trigger,
  children,
  align = 'end',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const close = (): void => {
    setIsOpen(false);
  };

  const handleTriggerClick = (): void => {
    setIsOpen((currentValue) => !currentValue);
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleDocumentMouseDown = (event: MouseEvent): void => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const handleDocumentKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('mousedown', handleDocumentMouseDown);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseDown);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [isOpen]);

  return (
    <S.Root ref={dropdownRef}>
      {trigger({
        isOpen,
        triggerProps: {
          type: 'button',
          onClick: handleTriggerClick,
        },
      })}

      {isOpen && <S.Content $align={align}>{children({ close })}</S.Content>}
    </S.Root>
  );
}
