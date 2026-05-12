export function hexWithOpacity(hex: string, opacityPercent: number): string {
  const alpha = Math.round((opacityPercent / 100) * 255)
    .toString(16)
    .toUpperCase()
    .padStart(2, '0');

  return `${hex}${alpha}`;
}
