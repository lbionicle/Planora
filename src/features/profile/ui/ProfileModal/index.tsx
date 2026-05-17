'use client';

import { ReactNode, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { UserRole } from '@/entities/user/model/types';
import { setUser } from '@/features/auth/model/authSlice';
import {
  useChangeCurrentPasswordMutation,
  useDeleteCurrentAvatarMutation,
  useGetCurrentProfileQuery,
  useUpdateCurrentProfileMutation,
  useUploadCurrentAvatarMutation,
} from '@/features/profile/api/profileApi';
import {
  getProfileFormValues,
  getProfilePayload,
  hasPasswordChanges,
} from '@/features/profile/lib/profileForm';
import {
  AVATAR_ALLOWED_TYPES,
  AVATAR_MAX_SIZE_BYTES,
} from '@/features/profile/model/constants';
import {
  getProfileSchema,
  ProfileFormValues,
} from '@/features/profile/model/schemas';
import { getApiErrorMessage, useAppDispatch } from '@/shared/lib';
import ActionButtons from '@/shared/ui/ActionButtons';
import Modal from '@/shared/ui/Modal';

import ProfileAvatarSection from '../ProfileAvatarSection';
import ProfileFields from '../ProfileFields';
import * as S from './styled';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROFILE_FORM_ID = 'profile-form';

export default function ProfileModal({
  isOpen,
  onClose,
}: ProfileModalProps): ReactNode {
  const dispatch = useAppDispatch();

  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null,
  );
  const [isAvatarMarkedForDelete, setIsAvatarMarkedForDelete] = useState(false);

  const { data, isLoading } = useGetCurrentProfileQuery(undefined, {
    skip: !isOpen,
  });

  const [updateProfile, { isLoading: isProfileUpdating }] =
    useUpdateCurrentProfileMutation();

  const [uploadAvatar, { isLoading: isAvatarUploading }] =
    useUploadCurrentAvatarMutation();

  const [deleteAvatar, { isLoading: isAvatarDeleting }] =
    useDeleteCurrentAvatarMutation();

  const [changePassword, { isLoading: isPasswordChanging }] =
    useChangeCurrentPasswordMutation();

  const profile = data?.data;
  const role = profile?.user.role;

  const formValues = useMemo(() => {
    return getProfileFormValues({
      role,
      email: profile?.user.email,
      participantFirstName: profile?.participant_profile?.first_name,
      participantLastName: profile?.participant_profile?.last_name,
      companyName: profile?.organizer_profile?.company_name,
    });
  }, [profile, role]);

  const schema = useMemo(() => getProfileSchema(role), [role]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    values: formValues,
  });

  const canEditProfileFields =
    role === UserRole.PARTICIPANT || role === UserRole.ORGANIZER;

  const isSaving =
    isProfileUpdating ||
    isAvatarUploading ||
    isAvatarDeleting ||
    isPasswordChanging;

  const handleClose = (): void => {
    setSelectedAvatarFile(null);
    setIsAvatarMarkedForDelete(false);
    onClose();
  };

  const handleSelectAvatar = (file: File): void => {
    if (!AVATAR_ALLOWED_TYPES.includes(file.type)) {
      toast.error('Допустимые форматы фотографии: PNG, JPEG.');
      return;
    }

    if (file.size > AVATAR_MAX_SIZE_BYTES) {
      toast.error('Размер фотографии не должен превышать 8MB.');
      return;
    }

    setSelectedAvatarFile(file);
    setIsAvatarMarkedForDelete(false);
  };

  const handleDeleteAvatar = (): void => {
    setSelectedAvatarFile(null);
    setIsAvatarMarkedForDelete(true);
  };

  const onSubmit = async (values: ProfileFormValues): Promise<void> => {
    if (!profile || !role) {
      return;
    }

    try {
      if (canEditProfileFields) {
        await updateProfile(getProfilePayload(role, values)).unwrap();
      }

      if (hasPasswordChanges(values)) {
        await changePassword({
          current_password: values.current_password?.trim() ?? '',
          new_password: values.new_password?.trim() ?? '',
        }).unwrap();
      }

      if (selectedAvatarFile) {
        const response = await uploadAvatar(selectedAvatarFile).unwrap();

        dispatch(setUser(response.data.user));
      } else if (isAvatarMarkedForDelete && profile.user.avatar_url) {
        const response = await deleteAvatar().unwrap();

        dispatch(setUser(response.data.user));
      }

      toast.success('Профиль обновлен.');
      handleClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Профиль"
      onClose={handleClose}
      footer={
        <ActionButtons
          primaryText="Сохранить"
          secondaryText="Отменить"
          primaryType="submit"
          primaryForm={PROFILE_FORM_ID}
          isLoading={isSaving}
          loadingText="Сохранение..."
          disabled={isLoading}
          onSecondaryClick={handleClose}
        />
      }
    >
      {isLoading && <S.Empty>Загрузка профиля...</S.Empty>}

      {!isLoading && profile && (
        <S.Form id={PROFILE_FORM_ID} onSubmit={handleSubmit(onSubmit)}>
          <ProfileAvatarSection
            avatarUrl={profile.user.avatar_url}
            selectedFile={selectedAvatarFile}
            isMarkedForDelete={isAvatarMarkedForDelete}
            disabled={isSaving}
            onSelectFile={handleSelectAvatar}
            onDelete={handleDeleteAvatar}
          />

          <ProfileFields
            role={role}
            email={profile.user.email}
            emailMode="readonly"
            showPasswordFields
            disabled={isSaving}
            register={register}
            errors={errors}
          />
        </S.Form>
      )}
    </Modal>
  );
}
