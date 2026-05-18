'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useLogoutMutation } from '@/features/auth/api/authApi';
import {
  selectCurrentUserAvatarUrl,
  selectCurrentUserEmail,
  selectIsAuthInitialized,
} from '@/features/auth/model/selectors';
import ProfileModal from '@/features/profile/ui/ProfileModal';
import { baseApi } from '@/shared/api/baseApi';
import {
  getApiErrorMessage,
  getUserAvatarSrc,
  useAppDispatch,
  useAppSelector,
} from '@/shared/lib';
import { routes } from '@/shared/model/routes';
import Dropdown from '@/shared/ui/Dropdown';

import WorkspaceUserMenu from '../WorkspaceUserMenu';
import * as S from './styled';

export default function WorkspaceUserBlock(): ReactNode {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const isInitialized = useAppSelector(selectIsAuthInitialized);
  const userEmail = useAppSelector(selectCurrentUserEmail);
  const userAvatarUrl = useAppSelector(selectCurrentUserAvatarUrl);

  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleSignInClick = (): void => {
    router.push(routes.auth.signIn);
  };

  const handleProfileClick = (): void => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = (): void => {
    setIsProfileModalOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout().unwrap();

      dispatch(baseApi.util.resetApiState());

      toast.success('Вы вышли из системы');
      router.replace(routes.auth.signIn);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  if (!isInitialized) {
    return null;
  }

  if (!userEmail) {
    return (
      <S.UserSignIn colorScheme="accent" size="sm" onClick={handleSignInClick}>
        Войти
      </S.UserSignIn>
    );
  }

  return (
    <>
      <Dropdown
        align="end"
        trigger={({ triggerProps }) => (
          <S.Wrapper {...triggerProps}>
            <S.UserImage>
              <Image
                fill
                src={getUserAvatarSrc(userAvatarUrl)}
                alt="Фотография пользователя"
                sizes="100%"
              />
            </S.UserImage>

            <S.Email>{userEmail}</S.Email>
          </S.Wrapper>
        )}
      >
        {({ close }) => (
          <WorkspaceUserMenu
            isLogoutLoading={isLogoutLoading}
            onProfileClick={() => {
              close();
              handleProfileClick();
            }}
            onLogoutClick={async () => {
              close();
              await handleLogout();
            }}
          />
        )}
      </Dropdown>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
      />
    </>
  );
}
