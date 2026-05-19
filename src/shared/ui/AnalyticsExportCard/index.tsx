'use client';

import { KeyboardEvent, MouseEvent, ReactNode } from 'react';

import Button from '@/shared/ui/Button';
import { DownloadIcon } from '@/shared/ui/Icons';

import * as S from './styled';

interface AnalyticsExportCardProps {
  title: string;
  description: string;
  buttonTitle?: string;
  isDisabled?: boolean;
  onClick: () => void;
}

export default function AnalyticsExportCard({
  title,
  description,
  buttonTitle = 'Экспортировать отчёт',
  isDisabled = false,
  onClick,
}: AnalyticsExportCardProps): ReactNode {
  const handleExport = (): void => {
    if (isDisabled) {
      return;
    }

    onClick();
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    handleExport();
  };

  const handleRootKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (isDisabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleExport();
    }
  };

  return (
    <S.Root
      $isDisabled={isDisabled}
      role={isDisabled ? undefined : 'button'}
      tabIndex={isDisabled ? undefined : 0}
      variant="accent"
      onClick={handleExport}
      onKeyDown={handleRootKeyDown}
    >
      <S.TextBlock $isDisabled={isDisabled}>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.TextBlock>

      <S.Actions>
        <Button
          rounded
          colorScheme="secondary"
          size="sm"
          title={buttonTitle}
          disabled={isDisabled}
          onClick={handleButtonClick}
        >
          <DownloadIcon />
        </Button>
      </S.Actions>
    </S.Root>
  );
}
