'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { UserRole } from '@/entities/user/model/types';
import {
  useRegisterOrganizerMutation,
  useRegisterParticipantMutation,
} from '@/features/auth/api/authApi';
import {
  OrganizerSignUpFormValues,
  organizerSignUpSchema,
  ParticipantSignUpFormValues,
  participantSignUpSchema,
} from '@/features/auth/model/schemas';
import { SignUpMode } from '@/features/auth/model/types';
import AuthAgreement from '@/features/auth/ui/AuthAgreement';
import AuthFormLayout from '@/features/auth/ui/AuthFormLayout';
import { getApiErrorMessage } from '@/shared/lib/getApiErrorMessage';
import { routes } from '@/shared/model/routes';
import { ActionButtonsProps } from '@/shared/ui/ActionButtons';
import FileUpload from '@/shared/ui/FileUpload';
import { EmailIcon, FileIcon } from '@/shared/ui/Icons';
import Input from '@/shared/ui/Input';
import PasswordInput from '@/shared/ui/PasswordInput';

import * as S from './styled';

const PARTICIPANT_SIGN_UP_FORM_ID = 'participant-sign-up-form';
const ORGANIZER_SIGN_UP_FORM_ID = 'organizer-sign-up-form';

export default function SignUpForm(): ReactNode {
  const router = useRouter();

  const [mode, setMode] = useState<SignUpMode>(UserRole.PARTICIPANT);

  const [registerParticipant, { isLoading: isParticipantLoading }] =
    useRegisterParticipantMutation();

  const [registerOrganizer, { isLoading: isOrganizerLoading }] =
    useRegisterOrganizerMutation();

  const participantForm = useForm<ParticipantSignUpFormValues>({
    resolver: zodResolver(participantSignUpSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
  });

  const organizerForm = useForm<OrganizerSignUpFormValues>({
    resolver: zodResolver(organizerSignUpSchema),
    defaultValues: {
      company_name: '',
      corporate_email: '',
      password: '',
    },
  });

  const verificationFile = organizerForm.watch('verification_file');
  const verificationFileName = verificationFile?.item(0)?.name;

  const isParticipantMode = mode === UserRole.PARTICIPANT;

  const onParticipantSubmit = async (
    values: ParticipantSignUpFormValues,
  ): Promise<void> => {
    try {
      await registerParticipant(values).unwrap();

      toast.success('Регистрация выполнена. Теперь войдите в систему.');
      router.replace(routes.auth.signIn);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const onOrganizerSubmit = async (
    values: OrganizerSignUpFormValues,
  ): Promise<void> => {
    const file = values.verification_file.item(0);

    if (!file) {
      toast.error('Загрузите файл для подтверждения юр. лица');
      return;
    }

    const formData = new FormData();

    formData.append('company_name', values.company_name);
    formData.append('corporate_email', values.corporate_email);
    formData.append('password', values.password);
    formData.append('verification_file', file);

    try {
      await registerOrganizer(formData).unwrap();

      toast.success(
        'Заявка отправлена. Ожидайте подтверждения администратора.',
      );
      router.replace(routes.auth.signIn);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const actions: ActionButtonsProps = {
    primaryText: isParticipantMode ? 'Зарегистрироваться' : 'Подать заявку',
    secondaryText: 'Войти',
    primaryType: 'submit',
    primaryForm: isParticipantMode
      ? PARTICIPANT_SIGN_UP_FORM_ID
      : ORGANIZER_SIGN_UP_FORM_ID,
    isLoading: isParticipantMode ? isParticipantLoading : isOrganizerLoading,
    loadingText: isParticipantMode ? 'Регистрация...' : 'Отправка...',
    onSecondaryClick: () => router.push(routes.auth.signIn),
  };

  return (
    <AuthFormLayout title="Регистрация" actions={actions}>
      <S.SignUpRoleTabs value={mode} onChange={setMode} />

      {isParticipantMode ? (
        <S.Form
          id={PARTICIPANT_SIGN_UP_FORM_ID}
          onSubmit={participantForm.handleSubmit(onParticipantSubmit)}
        >
          <Input
            error={participantForm.formState.errors.first_name?.message}
            label="Имя"
            placeholder="Введите имя"
            {...participantForm.register('first_name')}
          />

          <Input
            error={participantForm.formState.errors.last_name?.message}
            label="Фамилия"
            placeholder="Введите фамилию"
            {...participantForm.register('last_name')}
          />

          <Input
            error={participantForm.formState.errors.email?.message}
            label="Почта"
            leftIcon={<EmailIcon />}
            placeholder="Введите почту"
            type="email"
            {...participantForm.register('email')}
          />

          <PasswordInput
            error={participantForm.formState.errors.password?.message}
            label="Пароль"
            placeholder="Введите пароль"
            {...participantForm.register('password')}
          />

          <AuthAgreement />
        </S.Form>
      ) : (
        <S.Form
          id={ORGANIZER_SIGN_UP_FORM_ID}
          onSubmit={organizerForm.handleSubmit(onOrganizerSubmit)}
        >
          <Input
            error={organizerForm.formState.errors.company_name?.message}
            label="Название компании"
            placeholder="Введите название компании"
            {...organizerForm.register('company_name')}
          />

          <Input
            error={organizerForm.formState.errors.corporate_email?.message}
            label="Корпоративная почта"
            leftIcon={<EmailIcon />}
            placeholder="Введите корпоративную почту"
            type="email"
            {...organizerForm.register('corporate_email')}
          />

          <PasswordInput
            error={organizerForm.formState.errors.password?.message}
            label="Пароль"
            placeholder="Введите пароль"
            {...organizerForm.register('password')}
          />

          <FileUpload
            accept=".pdf,.png,.jpg,.jpeg"
            error={
              organizerForm.formState.errors.verification_file
                ?.message as string
            }
            fileName={verificationFileName}
            icon={<FileIcon />}
            label="Подтверждение юр. лица"
            {...organizerForm.register('verification_file')}
          />

          <AuthAgreement />
        </S.Form>
      )}
    </AuthFormLayout>
  );
}
