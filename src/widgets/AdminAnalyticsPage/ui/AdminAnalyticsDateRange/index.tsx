'use client';

import { ReactNode, useMemo } from 'react';

import DateInput from '@/shared/ui/DateInput';
import { MinusIcon } from '@/shared/ui/Icons';

import { parseDateInputValue } from '../../lib/formatAdminAnalytics';
import * as S from './styled';

interface AdminAnalyticsDateRangeProps {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

function getTodayDate(): Date {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return today;
}

function getEarlierDate(firstDate: Date, secondDate: Date): Date {
  return firstDate.getTime() < secondDate.getTime() ? firstDate : secondDate;
}

export default function AdminAnalyticsDateRange({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: AdminAnalyticsDateRangeProps): ReactNode {
  const today = useMemo(() => getTodayDate(), []);

  const fromDate = parseDateInputValue(dateFrom);
  const toDate = parseDateInputValue(dateTo);

  const maxFromDate = toDate ? getEarlierDate(toDate, today) : today;

  return (
    <S.Wrapper>
      <S.Label>Отображение данных по:</S.Label>

      <S.Fields>
        <DateInput
          value={dateFrom}
          mode="date"
          placeholder="Дата с"
          maxDate={maxFromDate}
          onChange={onDateFromChange}
        />

        <S.Separator>
          <MinusIcon />
        </S.Separator>

        <DateInput
          value={dateTo}
          mode="date"
          placeholder="Дата по"
          minDate={fromDate ?? undefined}
          maxDate={today}
          onChange={onDateToChange}
        />
      </S.Fields>
    </S.Wrapper>
  );
}
