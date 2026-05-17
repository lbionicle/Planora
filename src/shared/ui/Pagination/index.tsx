'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '../Icons';
import * as S from './styled';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPaginationItems(page: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages] as const;
  }

  if (page >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, 'ellipsis', page, 'ellipsis', totalPages] as const;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const items = getPaginationItems(page, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <S.Wrapper>
      <S.Button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ArrowLeftIcon />
      </S.Button>

      <S.Buttons>
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <S.Ellipsis key={`ellipsis-${index}`}>...</S.Ellipsis>
          ) : (
            <S.Button
              key={item}
              $isActive={item === page}
              type="button"
              onClick={() => onPageChange(item)}
            >
              {item}
            </S.Button>
          ),
        )}
      </S.Buttons>

      <S.Button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ArrowRightIcon />
      </S.Button>
    </S.Wrapper>
  );
}
