'use client';

import { PropsWithChildren } from 'react';

import * as S from './styled';

export default function AuthPageLayout({ children }: PropsWithChildren) {
  return <S.Page>{children}</S.Page>;
}
