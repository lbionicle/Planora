import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, theme } from '@/shared/theme';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}

      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
