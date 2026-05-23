import { DEFAULT_ANALYTICS_PERIOD_DAYS } from '../model/constants';

export function getDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getDefaultDateTo(): string {
  return getDateInputValue(new Date());
}

export function getDefaultDateFrom(): string {
  const date = new Date();

  date.setDate(date.getDate() - DEFAULT_ANALYTICS_PERIOD_DAYS);

  return getDateInputValue(date);
}

export function parseDateInputValue(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }

  const [year, month, day] = value.split('-').map(Number);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return undefined;
  }

  return new Date(year, month - 1, day);
}

export function formatChartDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
  }).format(date);
}

export function formatChartTooltipDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function formatPeriodLabel(dateFrom: string, dateTo: string): string {
  const from = parseDateInputValue(dateFrom);
  const to = parseDateInputValue(dateTo);

  if (!from || !to) {
    return 'Выберите период';
  }

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  });

  return `${formatter.format(from)} – ${formatter.format(to)}`;
}

export function formatGrowthPercent(value: number): string {
  const roundedValue = Math.round(value);

  if (roundedValue > 0) {
    return `+${roundedValue}%`;
  }

  return `${roundedValue}%`;
}
