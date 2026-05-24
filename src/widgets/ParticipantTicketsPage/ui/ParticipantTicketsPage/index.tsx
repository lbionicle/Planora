'use client';

import { ReactNode, useDeferredValue, useState } from 'react';
import { toast } from 'sonner';

import {
  useCancelParticipantTicketMutation,
  useDownloadParticipantTicketMutation,
  useGetParticipantTicketsQuery,
} from '@/entities/event/api/participantRegistrationsApi';
import { useEventCardActions } from '@/entities/event/lib/useEventCardActions';
import { EventTicket } from '@/entities/event/model/registrationTypes';
import EventTicketCard from '@/entities/event/ui/EventTicketCard';
import { getApiErrorMessage } from '@/shared/lib';
import { routes } from '@/shared/model/routes';
import InfiniteScrollObserver from '@/shared/ui/InfiniteScrollObserver';
import PageLayout from '@/shared/ui/PageLayout';
import SearchInput from '@/shared/ui/SearchInput';

import * as S from './styled';

const DEFAULT_PAGE = 1;
const TICKETS_PAGE_LIMIT = 10;

export default function ParticipantTicketsPage(): ReactNode {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [search, setSearch] = useState('');
  const [cancelingTicketId, setCancelingTicketId] = useState<string | null>(
    null,
  );
  const [downloadingTicketId, setDownloadingTicketId] = useState<string | null>(
    null,
  );

  const deferredSearch = useDeferredValue(search.trim());

  const { handleShareEvent } = useEventCardActions();

  const { data, isLoading, isFetching } = useGetParticipantTicketsQuery({
    page,
    limit: TICKETS_PAGE_LIMIT,
    search: deferredSearch,
  });

  const [cancelTicket] = useCancelParticipantTicketMutation();
  const [downloadTicket] = useDownloadParticipantTicketMutation();

  const tickets = data?.data.items ?? [];
  const pagination = data?.data.pagination;

  const hasNextPage = pagination
    ? pagination.page < pagination.total_pages
    : false;

  const breadcrumbs = [
    { label: 'Главная', href: routes.home },
    { label: 'Билеты' },
  ];

  const isInitialLoading = isLoading && tickets.length === 0;
  const isLoadingMore = isFetching && tickets.length > 0;
  const isEmpty = !isLoading && !isFetching && tickets.length === 0;
  const isSearching = deferredSearch.length > 0;

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  };

  const handleOpenOnline = (ticket: EventTicket): void => {
    if (!ticket.online_url) {
      toast.error('Ссылка на онлайн-мероприятие не указана.');
      return;
    }

    window.open(ticket.online_url, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = async (ticket: EventTicket): Promise<void> => {
    try {
      setDownloadingTicketId(ticket.id);

      await downloadTicket({
        registrationId: ticket.id,
        filename: `planora-ticket-${ticket.public_id}.pdf`,
      }).unwrap();

      toast.success('Билет успешно скачан.');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setDownloadingTicketId(null);
    }
  };

  const handleCancel = async (ticket: EventTicket): Promise<void> => {
    try {
      setCancelingTicketId(ticket.id);

      await cancelTicket(ticket.id).unwrap();

      setPage(DEFAULT_PAGE);
      toast.success('Заявка на мероприятие отменена.');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setCancelingTicketId(null);
    }
  };

  const handleLoadMore = (): void => {
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <PageLayout
      title="Ваши билеты"
      breadcrumbs={breadcrumbs}
      toolbar={
        <SearchInput
          value={search}
          placeholder="Введите название мероприятия для поиска"
          onChange={handleSearchChange}
        />
      }
    >
      {isInitialLoading && <S.Empty>Загрузка билетов...</S.Empty>}

      {isEmpty && (
        <S.Empty>
          {isSearching
            ? 'По вашему запросу ничего не найдено'
            : 'У вас пока нет активных билетов'}
        </S.Empty>
      )}

      {tickets.length > 0 && (
        <>
          <S.List>
            {tickets.map((ticket) => (
              <EventTicketCard
                key={ticket.id}
                ticket={ticket}
                isCancelLoading={cancelingTicketId === ticket.id}
                isDownloadLoading={downloadingTicketId === ticket.id}
                onShareClick={() => handleShareEvent(ticket.public_id)}
                onOpenOnlineClick={handleOpenOnline}
                onDownloadClick={handleDownload}
                onCancelClick={handleCancel}
              />
            ))}
          </S.List>

          <InfiniteScrollObserver
            hasNextPage={hasNextPage}
            isLoading={isFetching}
            onLoadMore={handleLoadMore}
          />

          {isLoadingMore && <S.LoadingMore>Загрузка билетов...</S.LoadingMore>}
        </>
      )}
    </PageLayout>
  );
}
