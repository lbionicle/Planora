'use client';

import { ReactNode } from 'react';

import { routes } from '@/shared/model/routes';

import * as S from './styled';

export default function AuthAgreement(): ReactNode {
  return (
    <S.Text>
      Регистрируясь или входя в систему, вы даёте{' '}
      <S.PrivacyLink target="_blank" href={routes.public.privacy}>
        cогласие на обработку персональных данных.
      </S.PrivacyLink>
    </S.Text>
  );
}
