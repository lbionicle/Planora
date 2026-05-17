'use client';

import { ReactNode, useState } from 'react';

import {
  DEFAULT_EVENT_FILTERS,
  eventCategoryLabels,
  eventFormatLabels,
  eventStatusLabels,
  eventVisibilityLabels,
} from '@/entities/event/model/constants';
import {
  EventCategory,
  EventFilters,
  EventFormat,
  EventStatus,
  EventVisibility,
} from '@/entities/event/model/types';
import ActionButtons from '@/shared/ui/ActionButtons';
import FiltersModalContent, {
  FiltersModalSection,
} from '@/shared/ui/FiltersModalContent';
import Modal from '@/shared/ui/Modal';
import RadioGroup, { RadioOption } from '@/shared/ui/RadioGroup';

type CategoryValue = EventCategory | 'ALL';
type VisibilityValue = EventVisibility | 'ALL';
type FormatValue = EventFormat | 'ALL';
type StatusValue = EventStatus | 'ALL';

interface EventFiltersModalProps {
  isOpen: boolean;
  initialFilters: EventFilters;
  onClose: () => void;
  onApply: (filters: EventFilters) => void;
}

const categoryOptions: RadioOption<CategoryValue>[] = [
  { label: 'Все категории', value: 'ALL' },
  ...Object.values(EventCategory).map((category) => ({
    label: eventCategoryLabels[category],
    value: category,
  })),
];

const visibilityOptions: RadioOption<VisibilityValue>[] = [
  { label: 'Все типы доступа', value: 'ALL' },
  ...Object.values(EventVisibility).map((visibility) => ({
    label: eventVisibilityLabels[visibility],
    value: visibility,
  })),
];

const formatOptions: RadioOption<FormatValue>[] = [
  { label: 'Все форматы', value: 'ALL' },
  ...Object.values(EventFormat).map((format) => ({
    label: eventFormatLabels[format],
    value: format,
  })),
];

const statusOptions: RadioOption<StatusValue>[] = [
  { label: 'Все статусы', value: 'ALL' },
  ...Object.values(EventStatus).map((status) => ({
    label: eventStatusLabels[status],
    value: status,
  })),
];

function getCategoryValue(category: EventCategory | null): CategoryValue {
  return category ?? 'ALL';
}

function getVisibilityValue(
  visibility: EventVisibility | null,
): VisibilityValue {
  return visibility ?? 'ALL';
}

function getFormatValue(format: EventFormat | null): FormatValue {
  return format ?? 'ALL';
}

function getStatusValue(status: EventStatus | null): StatusValue {
  return status ?? 'ALL';
}

export default function EventFiltersModal({
  isOpen,
  initialFilters,
  onClose,
  onApply,
}: EventFiltersModalProps): ReactNode {
  const [filters, setFilters] = useState<EventFilters>(initialFilters);

  const handleReset = (): void => {
    setFilters(DEFAULT_EVENT_FILTERS);
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
          name="event-category"
          value={getCategoryValue(filters.category)}
          options={categoryOptions}
          onChange={(value) =>
            setFilters((currentFilters) => ({
              ...currentFilters,
              category: value === 'ALL' ? null : value,
            }))
          }
        />
      ),
    },
    {
      key: 'visibility',
      title: 'Доступ',
      content: (
        <RadioGroup
          name="event-visibility"
          value={getVisibilityValue(filters.visibility)}
          options={visibilityOptions}
          onChange={(value) =>
            setFilters((currentFilters) => ({
              ...currentFilters,
              visibility: value === 'ALL' ? null : value,
            }))
          }
        />
      ),
    },
    {
      key: 'format',
      title: 'Формат',
      content: (
        <RadioGroup
          name="event-format"
          value={getFormatValue(filters.format)}
          options={formatOptions}
          onChange={(value) =>
            setFilters((currentFilters) => ({
              ...currentFilters,
              format: value === 'ALL' ? null : value,
            }))
          }
        />
      ),
    },
    {
      key: 'status',
      title: 'Статус',
      content: (
        <RadioGroup
          name="event-status"
          value={getStatusValue(filters.status)}
          options={statusOptions}
          onChange={(value) =>
            setFilters((currentFilters) => ({
              ...currentFilters,
              status: value === 'ALL' ? null : value,
            }))
          }
        />
      ),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      title="Фильтры"
      size="md"
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
      <FiltersModalContent sections={sections} columns={2} />
    </Modal>
  );
}
