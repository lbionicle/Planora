'use client';

import { ComponentPropsWithRef, useState } from 'react';

import { EyeIcon, EyeOffIcon, LockIcon } from '@/shared/ui/Icons';
import Input, { InputVariant } from '@/shared/ui/Input';

import * as S from './styled';

interface PasswordInputProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  error?: string;
  variant?: InputVariant;
}

export default function PasswordInput({
  label,
  error,
  variant = 'transparent',
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleButtonClick = () => setIsVisible((prev) => !prev);

  const Icon = isVisible ? <EyeIcon /> : <EyeOffIcon />;

  return (
    <Input
      {...props}
      label={label}
      error={error}
      variant={variant}
      leftIcon={<LockIcon />}
      type={isVisible ? 'text' : 'password'}
      rightElement={
        <S.ToggleButton type="button" onClick={handleToggleButtonClick}>
          {Icon}
        </S.ToggleButton>
      }
    />
  );
}
