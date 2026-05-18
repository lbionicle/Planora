export function formatEventSalesEndDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Дата не указана';
  }

  const day = date.getDate();
  const month = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
  }).format(date);
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}
