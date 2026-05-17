import { HTMLAttributes, PropsWithChildren } from 'react';

import * as S from './styled';

interface FilterButtonProps
  extends HTMLAttributes<HTMLButtonElement>, PropsWithChildren {}

export default function FilterButton({
  children,
  ...props
}: FilterButtonProps) {
  return <S.FilterActionButton {...props}>{children}</S.FilterActionButton>;
}
