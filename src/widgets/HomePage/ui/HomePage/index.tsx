'use client';

import { ReactNode } from 'react';

import AvailableEventsSection from '../AvailableEventsSection';
import HomeFaqSection from '../HomeFaqSection';
import HomeHeroCarousel from '../HomeHeroCarousel';
import * as S from './styled';

export default function HomePage(): ReactNode {
  return (
    <S.Page>
      <HomeHeroCarousel />
      <AvailableEventsSection />
      <HomeFaqSection />
    </S.Page>
  );
}
