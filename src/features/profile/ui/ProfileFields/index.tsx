'use client';

import { ReactNode } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { UserRole } from '@/entities/user/model/types';
import { ProfileFormValues } from '@/features/profile/model/schemas';
import Input from '@/shared/ui/Input';
import PasswordInput from '@/shared/ui/PasswordInput';

import * as S from './styled';

type EmailMode = 'hidden' | 'readonly' | 'editable';

interface ProfileFieldsProps {
  role?: UserRole;
  email?: string;
  emailMode?: EmailMode;
  showPasswordFields?: boolean;
  disabled?: boolean;
  register: UseFormRegister<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
}

export default function ProfileFields({
  role,
  email,
  emailMode = 'hidden',
  showPasswordFields = false,
  disabled = false,
  register,
  errors,
}: ProfileFieldsProps): ReactNode {
  return (
    <>
      {role === UserRole.PARTICIPANT && (
        <S.TwoColumns>
          <Input
            label="Фамилия"
            placeholder="Введите фамилию"
            error={errors.last_name?.message}
            disabled={disabled}
            {...register('last_name')}
          />

          <Input
            label="Имя"
            placeholder="Введите имя"
            error={errors.first_name?.message}
            disabled={disabled}
            {...register('first_name')}
          />
        </S.TwoColumns>
      )}

      {role === UserRole.ORGANIZER && (
        <Input
          label="Название компании"
          placeholder="Введите название компании"
          error={errors.company_name?.message}
          disabled={disabled}
          {...register('company_name')}
        />
      )}

      {emailMode === 'readonly' && (
        <Input label="Почта" value={email ?? ''} disabled readOnly />
      )}

      {emailMode === 'editable' && (
        <Input
          label="Почта"
          placeholder="Введите почту"
          error={errors.email?.message}
          disabled={disabled}
          {...register('email')}
        />
      )}

      {showPasswordFields && (
        <S.TwoColumns>
          <PasswordInput
            label="Текущий пароль"
            placeholder="Введите текущий пароль"
            error={errors.current_password?.message}
            disabled={disabled}
            autoComplete="off"
            {...register('current_password')}
          />

          <PasswordInput
            label="Новый пароль"
            placeholder="Введите новый пароль"
            error={errors.new_password?.message}
            disabled={disabled}
            autoComplete="new-password"
            {...register('new_password')}
          />
        </S.TwoColumns>
      )}
    </>
  );
}
