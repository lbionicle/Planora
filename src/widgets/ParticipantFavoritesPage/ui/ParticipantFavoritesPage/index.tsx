'use client';

import { ReactNode, useDeferredValue, useState } from 'react';

import { useGetParticipantFavoriteEventsQuery } from '@/entities/event/api/participantFavoritesApi';
import { useEventCardActions } from '@/entities/event/lib/useEventCardActions';
import EventCard from '@/entities/event/ui/EventCard';
import { routes } from '@/shared/model/routes';
import PageLayout from '@/shared/ui/PageLayout';
import SearchInput from '@/shared/ui/SearchInput';

import * as S from './styled';

const FAVORITES_PAGE_LIMIT = 12;

export default function ParticipantFavoritesPage(): ReactNode {
  const [search, setSearch] = useState('');
  const [page] = useState(1);

  const deferredSearch = useDeferredValue(search.trim());

  const { handleShareEvent, handleToggleFavoriteEvent } = useEventCardActions();

  const { data, isLoading, isFetching } = useGetParticipantFavoriteEventsQuery({
    page,
    limit: FAVORITES_PAGE_LIMIT,
    search: deferredSearch,
  });

  const events = data?.data.items ?? [];

  const breadcrumbs = [
    { label: 'Главная', href: routes.home },
    { label: 'Избранное' },
  ];

  const isEmpty = !isLoading && !isFetching && events.length === 0;
  const isSearching = deferredSearch.length > 0;

  return (
    <PageLayout
      title="Избранное"
      breadcrumbs={breadcrumbs}
      toolbar={
        <SearchInput
          value={search}
          placeholder="Введите название мероприятия для поиска"
          onChange={setSearch}
        />
      }
    >
      {(isLoading || isFetching) && (
        <S.Empty>Загрузка избранных мероприятий...</S.Empty>
      )}

      {isEmpty && (
        <S.Empty>
          {isSearching
            ? 'По вашему запросу ничего не найдено'
            : 'В избранном пока нет мероприятий'}
        </S.Empty>
      )}

      {!isLoading && !isFetching && events.length > 0 && (
        <S.List>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              showFavorite
              isFavorite
              onFavoriteClick={() => handleToggleFavoriteEvent(event.id)}
              onShareClick={() => handleShareEvent(event.public_id)}
            />
          ))}
        </S.List>
      )}
    </PageLayout>
  );
}
