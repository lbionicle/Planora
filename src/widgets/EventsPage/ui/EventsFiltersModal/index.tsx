'use client';

import { ReactNode, useState } from 'react';

import {
  eventCategoryLabels,
  eventFormatLabels,
} from '@/entities/event/model/constants';
import { EventCategory, EventFormat } from '@/entities/event/model/types';
import ActionButtons from '@/shared/ui/ActionButtons';
import DateInput from '@/shared/ui/DateInput';
import FiltersModalContent, {
  FiltersModalSection,
} from '@/shared/ui/FiltersModalContent';
import Modal from '@/shared/ui/Modal';
import RadioGroup, { RadioOption } from '@/shared/ui/RadioGroup';

import { DEFAULT_PUBLIC_EVENTS_FILTERS } from '../../model/constants';
import { PublicEventsFilters } from '../../model/types';

type CategoryValue = EventCategory | 'ALL';
type FormatValue = EventFormat | 'ALL';

interface EventsFiltersModalProps {
  isOpen: boolean;
  initialFilters: PublicEventsFilters;
  onClose: () => void;
  onApply: (filters: PublicEventsFilters) => void;
}

const categoryOptions: RadioOption<CategoryValue>[] = [
  { label: 'Все категории', value: 'ALL' },
  ...Object.values(EventCategory).map((category) => ({
    label: eventCategoryLabels[category],
    value: category,
  })),
];

const formatOptions: RadioOption<FormatValue>[] = [
  { label: 'Все форматы', value: 'ALL' },
  ...Object.values(EventFormat).map((format) => ({
    label: eventFormatLabels[format],
    value: format,
  })),
];

function getCategoryValue(category: EventCategory | null): CategoryValue {
  return category ?? 'ALL';
}

function getFormatValue(format: EventFormat | null): FormatValue {
  return format ?? 'ALL';
}

function getStartOfToday(): Date {
  const date = new Date();

  date.setHours(0, 0, 0, 0);

  return date;
}

export default function EventsFiltersModal({
  isOpen,
  initialFilters,
  onClose,
  onApply,
}: EventsFiltersModalProps): ReactNode {
  const [filters, setFilters] = useState<PublicEventsFilters>(initialFilters);

  const minEventDate = getStartOfToday();

  const handleCategoryChange = (value: CategoryValue): void => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      category: value === 'ALL' ? null : value,
    }));
  };

  const handleFormatChange = (value: FormatValue): void => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      format: value === 'ALL' ? null : value,
    }));
  };

  const handleDateChange = (value: string): void => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      date: value,
    }));
  };

  const handleReset = (): void => {
    setFilters(DEFAULT_PUBLIC_EVENTS_FILTERS);
  };

  const handleApply = (): void => {
    onApply(filters);
  };

  const sections: FiltersModalSection[] = [
    {
      key: 'category',
      title: 'Категория',
      content: (
        <RadioGroup
          name="public-event-category"
          value={getCategoryValue(filters.category)}
          options={categoryOptions}
          onChange={handleCategoryChange}
        />
      ),
    },
    {
      key: 'format',
      title: 'Формат',
      content: (
        <RadioGroup
          name="public-event-format"
          value={getFormatValue(filters.format)}
          options={formatOptions}
          onChange={handleFormatChange}
        />
      ),
    },
    {
      key: 'date',
      title: 'Дата мероприятия',
      content: (
        <DateInput
          mode="date"
          minDate={minEventDate}
          value={filters.date}
          placeholder="Выберите дату"
          onChange={handleDateChange}
        />
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      title="Фильтры"
      size="sm"
      onClose={onClose}
      footer={
        <ActionButtons
          primaryText="Применить"
          secondaryText="Сбросить"
          onPrimaryClick={handleApply}
          onSecondaryClick={handleReset}
        />
      }
    >
      <FiltersModalContent sections={sections} />
    </Modal>
  );
}
