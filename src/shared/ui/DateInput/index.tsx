'use client';

import { ReactNode, useId } from 'react';
import { ru } from 'date-fns/locale/ru';
import DatePicker from 'react-datepicker';

import { InputVariant } from '@/shared/ui/Input';

import * as S from './styled';

export type DateInputMode = 'date' | 'time' | 'datetime-local';

interface DateInputProps {
  label?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  variant?: InputVariant;
  mode?: DateInputMode;
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: string) => void;
}

function parseDateValue(
  value?: string,
  mode: DateInputMode = 'date',
): Date | null {
  if (!value) {
    return null;
  }

  if (mode === 'time') {
    const [hours, minutes] = value.split(':').map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return null;
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date;
  }

  if (mode === 'date') {
    const [year, month, day] = value.split('-').map(Number);

    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
      return null;
    }

    return new Date(year, month - 1, day);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function toDateInputValue(date: Date | null, mode: DateInputMode): string {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  if (mode === 'date') {
    return `${year}-${month}-${day}`;
  }

  if (mode === 'time') {
    return `${hours}:${minutes}`;
  }

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function getDateFormat(mode: DateInputMode): string {
  if (mode === 'date') {
    return 'dd.MM.yyyy';
  }

  if (mode === 'time') {
    return 'HH:mm';
  }

  return 'dd.MM.yyyy HH:mm';
}

export default function DateInput({
  label,
  error,
  value,
  placeholder,
  disabled = false,
  variant = 'transparent',
  mode = 'date',
  minDate,
  maxDate,
  onChange,
}: DateInputProps): ReactNode {
  const generatedId = useId();

  const selectedDate = parseDateValue(value, mode);
  const hasError = Boolean(error);

  return (
    <S.Wrapper>
      <S.DatePickerStyles />

      {label && <S.Label htmlFor={generatedId}>{label}</S.Label>}

      <DatePicker
        id={generatedId}
        selected={selectedDate}
        locale={ru}
        disabled={disabled}
        placeholderText={placeholder}
        dateFormat={getDateFormat(mode)}
        showTimeSelect={mode === 'datetime-local'}
        showTimeSelectOnly={mode === 'time'}
        timeFormat="HH:mm"
        timeIntervals={15}
        minDate={minDate}
        maxDate={maxDate}
        autoComplete="off"
        popperPlacement="bottom-start"
        popperClassName="planora-datepicker-popper"
        wrapperClassName="planora-datepicker-wrapper"
        calendarClassName="planora-datepicker-calendar"
        onChange={(date: Date | null) => {
          onChange(toDateInputValue(date, mode));
        }}
        customInput={
          <S.DateField
            $hasError={hasError}
            $isDisabled={disabled}
            $variant={variant}
          />
        }
      />

      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
}
