'use client';

import { PropsWithChildren, useState } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'styled-components';

import { makeStore } from '@/shared/lib';
import { GlobalStyles, theme } from '@/shared/theme';

export default function Providers({ children }: PropsWithChildren) {
  const [store] = useState(makeStore);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}

        <Toaster richColors position="bottom-right" />
      </ThemeProvider>
    </Provider>
  );
}
