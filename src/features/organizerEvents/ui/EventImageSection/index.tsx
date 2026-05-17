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

import { getEventImageSrc } from '@/entities/event/lib/getEventImageSrc';

import * as S from './styled';

interface EventImageSectionProps {
  imageUrl?: string | null;
  selectedFile: File | null;
  isMarkedForDelete: boolean;
  disabled?: boolean;
  onSelectFile: (file: File) => void;
  onDelete: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function EventImageSection({
  imageUrl,
  selectedFile,
  isMarkedForDelete,
  disabled = false,
  onSelectFile,
  onDelete,
}: EventImageSectionProps): ReactNode {
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

  const hasImage = Boolean(
    selectedFilePreview || (!isMarkedForDelete && imageUrl),
  );

  const imageSrc =
    selectedFilePreview ??
    getEventImageSrc(isMarkedForDelete ? null : imageUrl);

  const handleUploadClick = (): void => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  };

  const handleActionClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();

    if (hasImage) {
      onDelete(event);
      return;
    }

    handleUploadClick();
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
    <S.Wrapper>
      <S.Preview>
        <S.PreviewImage>
          <Image
            fill
            src={imageSrc}
            alt="Изображение мероприятия"
            sizes="100%"
          />
        </S.PreviewImage>

        <S.Overlay />

        <S.ActionButton
          colorScheme="secondary"
          disabled={disabled}
          $hasImage={hasImage}
          onClick={handleActionClick}
        >
          {hasImage ? 'Удалить фото' : 'Загрузить фото'}
        </S.ActionButton>
      </S.Preview>

      <S.FileInput
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleFileChange}
      />
    </S.Wrapper>
  );
}
