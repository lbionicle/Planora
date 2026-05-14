'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/shared/ui/Button';
import { CrossIcon } from '@/shared/ui/Icons';

import { privacyPolicySections } from '../../model/privacyPolicy';
import * as S from './styled';

const CLOSE_FALLBACK_DELAY_MS = 100;

export default function PrivacyPolicy(): ReactNode {
  const router = useRouter();

  const handleCloseButtonClick = (): void => {
    window.close();

    setTimeout(() => {
      router.back();
    }, CLOSE_FALLBACK_DELAY_MS);
  };

  return (
    <S.Document>
      <S.TitleWrapper>
        <S.Title>Политика в отношении обработки персональных данных</S.Title>

        <Button colorScheme="muted" size="xs" onClick={handleCloseButtonClick}>
          <CrossIcon />
        </Button>
      </S.TitleWrapper>

      <S.Content>
        {privacyPolicySections.map((section) => (
          <S.Section key={section.title}>
            <S.SectionTitle>{section.title}</S.SectionTitle>

            {section.paragraphs.map((paragraph) => (
              <S.Paragraph key={paragraph}>{paragraph}</S.Paragraph>
            ))}
          </S.Section>
        ))}
      </S.Content>
    </S.Document>
  );
}
