'use client';

import { ReactNode, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  useGetAdminUserQuery,
  useUpdateAdminUserMutation,
} from '@/entities/adminUser/api/adminUsersApi';
import { AdminUpdateUserRequest } from '@/entities/adminUser/model/types';
import { UserRole } from '@/entities/user/model/types';
import { getProfileFormValues } from '@/features/profile/lib/profileForm';
import {
  getAdminUserEditSchema,
  ProfileFormValues,
} from '@/features/profile/model/schemas';
import ProfileFields from '@/features/profile/ui/ProfileFields';
import { getApiErrorMessage } from '@/shared/lib';
import ActionButtons from '@/shared/ui/ActionButtons';
import Modal from '@/shared/ui/Modal';

import * as S from './styled';

interface AdminUserEditModalProps {
  isOpen: boolean;
  userId: string | null;
  onClose: () => void;
}

const ADMIN_USER_EDIT_FORM_ID = 'admin-user-edit-form';

function getAdminUserPayload(
  role: UserRole,
  values: ProfileFormValues,
): AdminUpdateUserRequest {
  if (role === UserRole.PARTICIPANT) {
    return {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
    };
  }

  if (role === UserRole.ORGANIZER) {
    return {
      email: values.email,
      company_name: values.company_name,
    };
  }

  return {
    email: values.email,
  };
}

export default function AdminUserEditModal({
  isOpen,
  userId,
  onClose,
}: AdminUserEditModalProps): ReactNode {
  const { data, isLoading } = useGetAdminUserQuery(userId ?? '', {
    skip: !isOpen || !userId,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateAdminUserMutation();

  const userDetail = data?.data;
  const role = userDetail?.user.role;

  const formValues = useMemo(() => {
    return getProfileFormValues({
      role,
      email: userDetail?.user.email,
      participantFirstName: userDetail?.participant_profile?.first_name,
      participantLastName: userDetail?.participant_profile?.last_name,
      companyName: userDetail?.organizer_profile?.company_name,
    });
  }, [role, userDetail]);

  const schema = useMemo(() => getAdminUserEditSchema(role), [role]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    values: formValues,
  });

  const onSubmit = async (values: ProfileFormValues): Promise<void> => {
    if (!userId || !role) {
      return;
    }

    try {
      await updateUser({
        userId,
        body: getAdminUserPayload(role, values),
      }).unwrap();

      toast.success('Данные пользователя обновлены.');
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Редактирование пользователя"
      onClose={onClose}
      footer={
        <ActionButtons
          primaryText="Сохранить"
          secondaryText="Отменить"
          primaryType="submit"
          primaryForm={ADMIN_USER_EDIT_FORM_ID}
          isLoading={isUpdating}
          loadingText="Сохранение..."
          disabled={isLoading}
          onSecondaryClick={onClose}
        />
      }
    >
      {isLoading && <S.Empty>Загрузка данных пользователя...</S.Empty>}

      {!isLoading && userDetail && (
        <S.Form id={ADMIN_USER_EDIT_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
          <ProfileFields
            role={role}
            emailMode="editable"
            disabled={isUpdating}
            register={register}
            errors={errors}
          />
        </S.Form>
      )}
    </Modal>
  );
}
