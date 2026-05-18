'use client';

import { ReactNode } from 'react';

import PageLayout from '@/shared/ui/PageLayout';

import AvailableEventsSection from '../AvailableEventsSection';
import HomeFaqSection from '../HomeFaqSection';
import HomeHeroCarousel from '../HomeHeroCarousel';

export default function HomePage(): ReactNode {
  return (
    <PageLayout>
      <HomeHeroCarousel />
      <AvailableEventsSection />
      <HomeFaqSection />
    </PageLayout>
  );
}
