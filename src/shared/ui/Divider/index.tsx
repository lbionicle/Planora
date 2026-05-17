'use client';

import { ComponentPropsWithRef } from 'react';

import * as S from './styled';

export type DividerOrientation = 'horizontal' | 'vertical';

interface DividerProps extends ComponentPropsWithRef<'div'> {
  orientation?: DividerOrientation;
}

export default function Divider({
  orientation = 'horizontal',
  ...props
}: DividerProps) {
  return <S.Divider $orientation={orientation} {...props} />;
}
