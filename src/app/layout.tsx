import { PropsWithChildren, ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import StyledComponentsRegistry from '@/lib/registry';

import Providers from './providers';

const inter = Inter({
  subsets: ['cyrillic'],
  weight: ['400', '500', '600'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Planora',
  description:
    'Программное средство для автоматизации процесса организации корпоративных мероприятий с использованием функции RSVP.',
  authors: [{ name: 'Mikalai Tsymbal', url: 'https://github.com/lbionicle' }],
  keywords: ['Planora', 'events', 'participant management', 'RSVP'],
};

export default function RootLayout({ children }: PropsWithChildren): ReactNode {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
