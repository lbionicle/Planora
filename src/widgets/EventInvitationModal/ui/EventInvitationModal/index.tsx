'use client';

import { ReactNode, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import ActionButtons from '@/shared/ui/ActionButtons';
import { EmailIcon } from '@/shared/ui/Icons';
import Input from '@/shared/ui/Input';
import Modal from '@/shared/ui/Modal';
import {
  EventInvitationFormValues,
  eventInvitationSchema,
} from '@/widgets/EventInvitationModal/model/schema';

import * as S from './styled';

const EVENT_INVITATION_FORM_ID = 'event-invitation-form';

interface EventInvitationModalProps {
  isOpen: boolean;
  eventTitle?: string;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void | Promise<void>;
}

export default function EventInvitationModal({
  isOpen,
  eventTitle,
  isLoading = false,
  onClose,
  onSubmit,
}: EventInvitationModalProps): ReactNode {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventInvitationFormValues>({
    resolver: zodResolver(eventInvitationSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleInvitationSubmit = async (
    values: EventInvitationFormValues,
  ): Promise<void> => {
    await onSubmit(values.email);
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Отправка приглашения"
      size="sm"
      onClose={onClose}
      footer={
        <ActionButtons
          primaryText="Отправить"
          secondaryText="Отменить"
          primaryType="submit"
          primaryForm={EVENT_INVITATION_FORM_ID}
          primaryColorScheme="accent"
          isLoading={isLoading}
          loadingText="Отправка..."
          onSecondaryClick={onClose}
        />
      }
    >
      <S.Form
        id={EVENT_INVITATION_FORM_ID}
        onSubmit={handleSubmit(handleInvitationSubmit)}
      >
        {eventTitle && (
          <S.Description>
            Приглашение будет отправлено на мероприятие «{eventTitle}».
          </S.Description>
        )}

        <Input
          error={errors.email?.message}
          label="Почта получателя"
          leftIcon={<EmailIcon />}
          placeholder="Введите почту"
          type="email"
          disabled={isLoading}
          {...register('email')}
        />
      </S.Form>
    </Modal>
  );
}
