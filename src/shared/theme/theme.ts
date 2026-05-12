import { palette } from './pallete';

export const theme = {
  text: {
    primary: palette.black[100],
    secondary: palette.black[80],
    muted: palette.black[60],
  },
  background: {
    primary: palette.white[100],
    secondary: palette.lightGray[100],
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
};

export type Theme = typeof theme;
