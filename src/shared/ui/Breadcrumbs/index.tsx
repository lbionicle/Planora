'use client';

import Link from 'next/link';

import * as S from './styled';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <S.List>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <S.Item key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <S.ItemLink as={Link} href={item.href}>
                {item.label}
              </S.ItemLink>
            ) : (
              <S.Text>{item.label}</S.Text>
            )}

            {!isLast && <S.Separator>/</S.Separator>}
          </S.Item>
        );
      })}
    </S.List>
  );
}
