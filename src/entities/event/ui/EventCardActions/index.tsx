'use client';

import { HTMLAttributes, MouseEvent, ReactNode } from 'react';

import { HeartFillIcon, HeartIcon, ShareIcon } from '@/shared/ui/Icons';

import * as S from './styled';

interface EventCardActionsProps extends HTMLAttributes<HTMLDivElement> {
  isFavorite?: boolean;
  showFavorite?: boolean;
  isFavoriteDisabled?: boolean;
  isShareDisabled?: boolean;
  onFavoriteClick?: () => void | Promise<void>;
  onShareClick?: () => void | Promise<void>;
}

export default function EventCardActions({
  isFavorite = false,
  showFavorite = false,
  isFavoriteDisabled = false,
  isShareDisabled = false,
  onFavoriteClick,
  onShareClick,
  ...props
}: EventCardActionsProps): ReactNode {
  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    onFavoriteClick?.();
  };

  const handleShareClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();

    onShareClick?.();
  };

  return (
    <S.Actions {...props}>
      {showFavorite && (
        <S.ActionButton
          $tone="favorite"
          $isActive={isFavorite}
          title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          disabled={isFavoriteDisabled || !onFavoriteClick}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? <HeartFillIcon /> : <HeartIcon />}
        </S.ActionButton>
      )}

      <S.ActionButton
        $tone="default"
        $isActive={false}
        title="Скопировать ссылку"
        disabled={isShareDisabled || !onShareClick}
        onClick={handleShareClick}
      >
        <ShareIcon />
      </S.ActionButton>
    </S.Actions>
  );
}
