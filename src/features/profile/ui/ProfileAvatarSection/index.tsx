'use client';

import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import Image from 'next/image';

import { getUserAvatarSrc } from '@/shared/lib';
import { TrashIcon } from '@/shared/ui/Icons';

import * as S from './styled';

interface ProfileAvatarSectionProps {
  avatarUrl?: string | null;
  selectedFile: File | null;
  isMarkedForDelete: boolean;
  disabled?: boolean;
  onSelectFile: (file: File) => void;
  onDelete: () => void;
}

export default function ProfileAvatarSection({
  avatarUrl,
  selectedFile,
  isMarkedForDelete,
  disabled = false,
  onSelectFile,
  onDelete,
}: ProfileAvatarSectionProps): ReactNode {
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedFilePreview = useMemo(() => {
    if (!selectedFile) {
      return null;
    }

    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      if (selectedFilePreview) {
        URL.revokeObjectURL(selectedFilePreview);
      }
    };
  }, [selectedFilePreview]);

  const imageSrc =
    selectedFilePreview ??
    (isMarkedForDelete ? getUserAvatarSrc(null) : getUserAvatarSrc(avatarUrl));

  const canDelete =
    !disabled && !isMarkedForDelete && Boolean(selectedFile || avatarUrl);

  const handleUploadClick = (): void => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  };

  const handleDeleteClick = (event: MouseEvent<HTMLSpanElement>): void => {
    event.stopPropagation();

    onDelete();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onSelectFile(file);

    event.target.value = '';
  };

  return (
    <S.Wrapper type="button" disabled={disabled} onClick={handleUploadClick}>
      <S.Avatar>
        <Image fill src={imageSrc} alt="Фотография пользователя" sizes="100%" />

        {canDelete && (
          <S.DeleteAvatarButton onClick={handleDeleteClick}>
            <TrashIcon />
          </S.DeleteAvatarButton>
        )}
      </S.Avatar>

      <S.Content>
        <S.Title>Ваша фотография</S.Title>
        <S.HelpText>Мы поддерживаем PNG, JPEG не более 2MB</S.HelpText>

        <S.FileInput
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          disabled={disabled}
          onChange={handleFileChange}
        />
      </S.Content>
    </S.Wrapper>
  );
}
