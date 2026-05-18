'use client';

import { ReactNode, useMemo, useState } from 'react';

import { useGetPublicEventsQuery } from '@/entities/event/api/publicEventsApi';
import { useEventCardActions } from '@/entities/event/lib';
import EventCard from '@/entities/event/ui/EventCard';
import Tabs, { TabItem } from '@/shared/ui/Tabs';

import * as S from './styled';

type EventsTab = 'all' | 'today' | 'weekend';

const tabs: TabItem<EventsTab>[] = [
  { label: 'Все', value: 'all' },
  { label: 'Сегодня', value: 'today' },
  { label: 'На выходных', value: 'weekend' },
];

function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return {
    date_from: start.toISOString(),
    date_to: end.toISOString(),
  };
}

function getWeekendRange() {
  const now = new Date();
  const day = now.getDay();
  const daysUntilSaturday = day === 6 ? 0 : (6 - day + 7) % 7;

  const saturday = new Date(now);
  saturday.setDate(now.getDate() + daysUntilSaturday);
  saturday.setHours(0, 0, 0, 0);

  const sunday = new Date(saturday);
  sunday.setDate(saturday.getDate() + 1);
  sunday.setHours(23, 59, 59, 999);

  return {
    date_from: saturday.toISOString(),
    date_to: sunday.toISOString(),
  };
}

function getDateFilter(tab: EventsTab) {
  if (tab === 'today') {
    return getTodayRange();
  }

  if (tab === 'weekend') {
    return getWeekendRange();
  }

  return {};
}

export default function AvailableEventsSection(): ReactNode {
  const [activeTab, setActiveTab] = useState<EventsTab>('all');

  const dateFilter = useMemo(() => getDateFilter(activeTab), [activeTab]);

  const {
    showFavorite,
    isEventFavorite,
    handleShareEvent,
    handleToggleFavoriteEvent,
  } = useEventCardActions();

  const { data, isLoading, isFetching } = useGetPublicEventsQuery({
    page: 1,
    limit: 10,
    ...dateFilter,
  });

  const events = data?.data.items ?? [];

  return (
    <S.Section>
      <S.Header>
        <S.Title>Доступные мероприятия</S.Title>
        <Tabs items={tabs} value={activeTab} onChange={setActiveTab} />
      </S.Header>

      {(isLoading || isFetching) && <S.Empty>Загрузка мероприятий...</S.Empty>}

      {!isLoading && !isFetching && events.length === 0 && (
        <S.Empty>Мероприятия не найдены</S.Empty>
      )}

      {!isLoading && !isFetching && events.length > 0 && (
        <S.List>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              showFavorite={showFavorite}
              isFavorite={isEventFavorite(event.id)}
              onFavoriteClick={() => handleToggleFavoriteEvent(event.id)}
              onShareClick={() => handleShareEvent(event.public_id)}
            />
          ))}
        </S.List>
      )}
    </S.Section>
  );
}
