'use client';

import { PropsWithChildren } from 'react';

import ActionButtons, { ActionButtonsProps } from '@/shared/ui/ActionButtons';

import * as S from './styled';

interface AuthFormLayoutProps extends PropsWithChildren {
  title: string;
  actions: ActionButtonsProps;
}

export default function AuthFormLayout({
  title,
  actions,
  children,
}: AuthFormLayoutProps) {
  return (
    <S.Card>
      <S.Title>{title}</S.Title>
      {children}
      <ActionButtons {...actions} />
    </S.Card>
  );
}
