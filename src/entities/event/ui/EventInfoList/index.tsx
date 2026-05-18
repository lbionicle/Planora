'use client';

import { ReactNode } from 'react';

import * as S from './styled';

export interface EventInfoListItem {
  key: string;
  text: ReactNode;
  icon?: ReactNode;
  title?: string;
}

interface EventInfoListProps {
  items: EventInfoListItem[];
  truncate?: boolean;
  className?: string;
}

export default function EventInfoList({
  items,
  truncate = true,
  className,
}: EventInfoListProps): ReactNode {
  const visibleItems = items.filter(
    (item) => item.text !== null && item.text !== undefined && item.text !== '',
  );

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <S.List className={className}>
      {visibleItems.map((item) => (
        <S.Item key={item.key}>
          {item.icon && <S.Icon>{item.icon}</S.Icon>}

          <S.Text title={item.title} $truncate={truncate}>
            {item.text}
          </S.Text>
        </S.Item>
      ))}
    </S.List>
  );
}
