'use client';

import { ReactNode, useEffect, useRef } from 'react';

import * as S from './styled';

interface InfiniteScrollObserverProps {
  hasNextPage: boolean;
  isLoading: boolean;
  rootMargin?: string;
  threshold?: number;
  onLoadMore: () => void;
}

export default function InfiniteScrollObserver({
  hasNextPage,
  isLoading,
  rootMargin = '200px',
  threshold = 0,
  onLoadMore,
}: InfiniteScrollObserverProps): ReactNode {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const onLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    const target = triggerRef.current;

    if (!target || !hasNextPage || isLoading) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          onLoadMoreRef.current();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isLoading, rootMargin, threshold]);

  if (!hasNextPage) {
    return null;
  }

  return <S.Trigger ref={triggerRef} aria-hidden="true" />;
}
