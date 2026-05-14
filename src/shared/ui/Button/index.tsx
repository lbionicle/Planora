import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import * as S from './styled';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonColorScheme =
  | 'success'
  | 'danger'
  | 'info'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'muted';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  fullWidth?: boolean;
  rounded?: boolean;
  bordered?: boolean;
}

export default function Button({
  children,
  size = 'lg',
  colorScheme = 'accent',
  fullWidth = false,
  rounded = false,
  bordered = false,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <S.Button
      $size={size}
      $colorScheme={colorScheme}
      $fullWidth={fullWidth}
      $rounded={rounded}
      $bordered={bordered}
      type={type}
      {...props}
    >
      {children}
    </S.Button>
  );
}
