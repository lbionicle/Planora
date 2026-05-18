'use client';

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import * as S from './styled';

interface HeroSlide {
  id: number;
  src: string;
  alt: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    src: '/images/home/hero-1.webp',
    alt: 'Конференция',
  },
  {
    id: 2,
    src: '/images/home/hero-2.webp',
    alt: 'Бизнес-встреча',
  },
  {
    id: 3,
    src: '/images/home/hero-3.webp',
    alt: 'Корпоративное-мероприятие',
  },
  {
    id: 4,
    src: '/images/home/hero-4.webp',
    alt: 'Бизнес-встреча',
  },
];

export default function HomeHeroCarousel(): ReactNode {
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
    },
    [autoplayPlugin],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = useCallback((): void => {
    if (!emblaApi) {
      return;
    }

    const currentIndex = emblaApi.selectedScrollSnap();

    setSelectedIndex((previousIndex) =>
      previousIndex === currentIndex ? previousIndex : currentIndex,
    );
  }, [emblaApi]);

  const handleDotClick = (index: number): void => {
    emblaApi?.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.on('select', handleSelect);
    emblaApi.on('reInit', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('reInit', handleSelect);
    };
  }, [emblaApi, handleSelect]);

  return (
    <S.Carousel>
      <S.Viewport ref={emblaRef}>
        <S.Container>
          {slides.map((slide) => (
            <S.Slide key={slide.id}>
              <S.ImageWrapper>
                <Image
                  fill
                  priority={slide.id === 1}
                  src={slide.src}
                  alt={slide.alt}
                  sizes="100%"
                />
              </S.ImageWrapper>
            </S.Slide>
          ))}
        </S.Container>
      </S.Viewport>

      <S.Dots>
        {slides.map((slide, index) => (
          <S.Dot
            key={slide.id}
            type="button"
            aria-label={`Перейти к слайду ${index + 1}`}
            $isActive={selectedIndex === index}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </S.Dots>
    </S.Carousel>
  );
}
