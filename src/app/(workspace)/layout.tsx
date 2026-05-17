import { PropsWithChildren, ReactNode } from 'react';

import WorkspaceLayout from '@/widgets/WorkspaceLayout/ui/WorkspaceLayout';

export default function Layout({ children }: PropsWithChildren): ReactNode {
  return <WorkspaceLayout>{children}</WorkspaceLayout>;
}
