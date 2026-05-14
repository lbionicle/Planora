import { PropsWithChildren } from 'react';

import AuthPageLayout from '@/features/auth/ui/AuthPageLayout';

export default function Layout({ children }: PropsWithChildren) {
  return <AuthPageLayout>{children}</AuthPageLayout>;
}
