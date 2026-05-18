'use client';

import { useMemo } from 'react';
import { toast } from 'sonner';

import {
  useAddParticipantFavoriteEventMutation,
  useGetParticipantFavoriteEventIdsQuery,
  useRemoveParticipantFavoriteEventMutation,
} from '@/entities/event/api/participantFavoritesApi';
import { UserRole } from '@/entities/user/model/types';
import { selectCurrentUserRole } from '@/features/auth/model/selectors';
import { getApiErrorMessage, useAppSelector } from '@/shared/lib';
import { routes } from '@/shared/model/routes';

export function useEventCardActions() {
  const currentUserRole = useAppSelector(selectCurrentUserRole);
  const isParticipant = currentUserRole === UserRole.PARTICIPANT;

  const { data: favoritesData } = useGetParticipantFavoriteEventIdsQuery(
    undefined,
    {
      skip: !isParticipant,
    },
  );

  const [addFavorite] = useAddParticipantFavoriteEventMutation();
  const [removeFavorite] = useRemoveParticipantFavoriteEventMutation();

  const favoriteIds = useMemo(() => {
    return new Set(favoritesData?.data.event_ids ?? []);
  }, [favoritesData]);

  const handleShareEvent = async (publicId: string): Promise<void> => {
    try {
      const url = `${window.location.origin}${routes.public.eventDetails(publicId)}`;

      await navigator.clipboard.writeText(url);

      toast.success('Ссылка скопирована.');
    } catch {
      toast.error('Не удалось скопировать ссылку.');
    }
  };

  const handleToggleFavoriteEvent = async (eventId: string): Promise<void> => {
    if (!isParticipant) {
      toast.error('Добавление в избранное доступно только участникам.');
      return;
    }

    try {
      if (favoriteIds.has(eventId)) {
        await removeFavorite(eventId).unwrap();
        toast.success('Мероприятие удалено из избранного.');
        return;
      }

      await addFavorite(eventId).unwrap();
      toast.success('Мероприятие добавлено в избранное.');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return {
    showFavorite: isParticipant,
    isEventFavorite: (eventId: string) => favoriteIds.has(eventId),
    handleShareEvent,
    handleToggleFavoriteEvent,
  };
}
