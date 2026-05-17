'use client';

import { ReactNode } from 'react';

import * as S from './styled';

export interface FiltersModalSection {
  key: string;
  title: string;
  content: ReactNode;
}

interface FiltersModalContentProps {
  sections: FiltersModalSection[];
  columns?: 1 | 2;
}

export default function FiltersModalContent({
  sections,
  columns = 1,
}: FiltersModalContentProps): ReactNode {
  if (sections.length === 0) {
    return null;
  }

  return (
    <S.Content $columns={columns}>
      {sections.map((section) => (
        <S.Section key={section.key}>
          <S.SectionTitle>{section.title}</S.SectionTitle>
          {section.content}
        </S.Section>
      ))}
    </S.Content>
  );
}
