'use client';

import { ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useLoginMutation } from '@/features/auth/api/authApi';
import { getRedirectAfterLogin } from '@/features/auth/lib/getRedirectAfterLogin';
import { SignInFormValues, signInSchema } from '@/features/auth/model/schemas';
import AuthAgreement from '@/features/auth/ui/AuthAgreement';
import AuthFormLayout from '@/features/auth/ui/AuthFormLayout';
import { getApiErrorMessage } from '@/shared/lib/getApiErrorMessage';
import { routes } from '@/shared/model/routes';
import { ActionButtonsProps } from '@/shared/ui/ActionButtons';
import { EmailIcon } from '@/shared/ui/Icons';
import Input from '@/shared/ui/Input';
import PasswordInput from '@/shared/ui/PasswordInput';

import * as S from './styled';

const SIGN_IN_FORM_ID = 'sign-in-form';

export default function SignInForm(): ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SignInFormValues): Promise<void> => {
    try {
      const response = await login(values).unwrap();

      const redirectPath = getRedirectAfterLogin(
        response.data.user.role,
        searchParams.get('callbackUrl'),
      );

      toast.success('Вход выполнен успешно');
      router.replace(redirectPath);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const actions: ActionButtonsProps = {
    primaryText: 'Войти',
    secondaryText: 'Зарегистрироваться',
    primaryType: 'submit',
    primaryForm: SIGN_IN_FORM_ID,
    primaryDisabled: isLoading,
    loadingText: 'Вход...',
    onSecondaryClick: () => router.push(routes.auth.signUp),
  };

  return (
    <AuthFormLayout title="Авторизация" actions={actions}>
      <S.Form id={SIGN_IN_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.email?.message}
          label="Почта"
          leftIcon={<EmailIcon />}
          placeholder="Введите почту"
          type="email"
          {...register('email')}
        />

        <PasswordInput
          error={errors.password?.message}
          label="Пароль"
          placeholder="Введите пароль"
          {...register('password')}
        />

        <AuthAgreement />
      </S.Form>
    </AuthFormLayout>
  );
}
