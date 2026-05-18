export function capitalizeFirstLetter(
  value: string,
  locales: Intl.LocalesArgument = 'ru-RU',
): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toLocaleUpperCase(locales) + value.slice(1);
}
