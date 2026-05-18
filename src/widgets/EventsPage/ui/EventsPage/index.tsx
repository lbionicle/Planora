'use client';

import { ReactNode, useState } from 'react';

import { useGetPublicEventsQuery } from '@/entities/event/api/publicEventsApi';
import { useEventCardActions } from '@/entities/event/lib/useEventCardActions';
import EventCard from '@/entities/event/ui/EventCard';
import { useDebouncedValue } from '@/shared/lib';
import { routes } from '@/shared/model/routes';
import FilterButton from '@/shared/ui/FilterButton';
import { FilterIcon } from '@/shared/ui/Icons';
import PageLayout from '@/shared/ui/PageLayout';
import PageToolbar from '@/shared/ui/PageToolbar';

import { getPublicEventsQueryFilters, hasPublicEventsFilters } from '../../lib';
import { DEFAULT_PUBLIC_EVENTS_FILTERS } from '../../model/constants';
import { PublicEventsFilters } from '../../model/types';
import EventsFiltersModal from '../EventsFiltersModal';
import PublicEventsActiveFilters from '../PublicEventsActiveFilters';
import * as S from './styled';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const SEARCH_DELAY_MS = 800;

export default function EventsPage(): ReactNode {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<PublicEventsFilters>(
    DEFAULT_PUBLIC_EVENTS_FILTERS,
  );
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const debouncedSearch = useDebouncedValue(search, SEARCH_DELAY_MS);

  const {
    showFavorite,
    isEventFavorite,
    handleShareEvent,
    handleToggleFavoriteEvent,
  } = useEventCardActions();

  const queryFilters = getPublicEventsQueryFilters(filters);

  const { data, isLoading, isFetching } = useGetPublicEventsQuery({
    page,
    limit: DEFAULT_LIMIT,
    search: debouncedSearch,
    ...queryFilters,
  });

  const events = data?.data.items ?? [];

  const breadcrumbs = [
    { label: 'Главная', href: routes.home },
    { label: 'Мероприятия' },
  ];

  const hasFilters = hasPublicEventsFilters(filters);
  const isSearching = debouncedSearch.length > 0;
  const isEmpty = !isLoading && !isFetching && events.length === 0;

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  };

  const handleApplyFilters = (nextFilters: PublicEventsFilters): void => {
    setFilters(nextFilters);
    setPage(DEFAULT_PAGE);
    setIsFiltersOpen(false);
  };

  const handleCategoryClear = (): void => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      category: null,
    }));
    setPage(DEFAULT_PAGE);
  };

  const handleFormatClear = (): void => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      format: null,
    }));
    setPage(DEFAULT_PAGE);
  };

  const handleDateClear = (): void => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      date: '',
    }));
    setPage(DEFAULT_PAGE);
  };

  return (
    <>
      <PageLayout
        title="Мероприятия"
        breadcrumbs={breadcrumbs}
        toolbar={
          <PageToolbar
            search={{
              value: search,
              placeholder: 'Введите название мероприятия',
              onChange: handleSearchChange,
            }}
            action={
              <FilterButton onClick={() => setIsFiltersOpen(true)}>
                <FilterIcon />
              </FilterButton>
            }
            bottom={
              hasFilters && (
                <PublicEventsActiveFilters
                  filters={filters}
                  onCategoryClear={handleCategoryClear}
                  onFormatClear={handleFormatClear}
                  onDateClear={handleDateClear}
                />
              )
            }
          />
        }
      >
        {(isLoading || isFetching) && (
          <S.Empty>Загрузка мероприятий...</S.Empty>
        )}

        {isEmpty && (
          <S.Empty>
            {isSearching || hasFilters
              ? 'По вашему запросу ничего не найдено'
              : 'Мероприятия пока не найдены'}
          </S.Empty>
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
      </PageLayout>

      {isFiltersOpen && (
        <EventsFiltersModal
          isOpen={isFiltersOpen}
          initialFilters={filters}
          onClose={() => setIsFiltersOpen(false)}
          onApply={handleApplyFilters}
        />
      )}
    </>
  );
}
