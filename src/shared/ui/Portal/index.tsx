'use client';

import { PropsWithChildren, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: PropsWithChildren): ReactNode {
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(children, document.body);
}
