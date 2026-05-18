export function getEventMapUrl(location: string): string {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(location)}`;
}
