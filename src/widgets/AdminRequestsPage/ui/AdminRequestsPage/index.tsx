'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import {
  useApproveOrganizerRequestMutation,
  useGetOrganizerRequestsQuery,
  useRejectOrganizerRequestMutation,
} from '@/features/adminRequests/api/adminRequestsApi';
import { getApiErrorMessage, useDebouncedValue } from '@/shared/lib';
import PageLayout from '@/shared/ui/PageLayout';
import PageToolbar from '@/shared/ui/PageToolbar';
import PaginatedTable from '@/shared/ui/PaginatedTable';

import { downloadRequestFile } from '../../lib/downloadRequestFile';
import { getColumns } from '../../model/requestsTableColumns';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SEARCH_DELAY_MS = 400;

export default function AdminRequestsPage(): ReactNode {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [search, setSearch] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(search, SEARCH_DELAY_MS);

  const { data, isLoading, isFetching } = useGetOrganizerRequestsQuery({
    page,
    limit: DEFAULT_LIMIT,
    search: debouncedSearch,
  });

  const [approveRequest] = useApproveOrganizerRequestMutation();
  const [rejectRequest] = useRejectOrganizerRequestMutation();

  const requests = data?.data.items ?? [];
  const totalPages = data?.data.pagination.total_pages ?? 1;

  const handleSearchChange = useCallback((value: string): void => {
    setSearch(value);
    setPage(DEFAULT_PAGE);
  }, []);

  const handleDownload = useCallback(async (requestId: string) => {
    try {
      setProcessingId(requestId);

      await downloadRequestFile(requestId);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setProcessingId(null);
    }
  }, []);

  const handleApprove = useCallback(
    async (requestId: string) => {
      try {
        setProcessingId(requestId);

        await approveRequest(requestId).unwrap();

        toast.success('Заявка одобрена.');
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setProcessingId(null);
      }
    },
    [approveRequest],
  );

  const handleReject = useCallback(
    async (requestId: string) => {
      try {
        setProcessingId(requestId);

        await rejectRequest(requestId).unwrap();

        toast.success('Заявка отклонена.');
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setProcessingId(null);
      }
    },
    [rejectRequest],
  );

  const columns = useMemo(
    () =>
      getColumns({
        page,
        limit: DEFAULT_LIMIT,
        processingId,
        onDownload: handleDownload,
        onApprove: handleApprove,
        onReject: handleReject,
      }),
    [page, processingId, handleDownload, handleApprove, handleReject],
  );

  return (
    <PageLayout
      title="Заявки"
      toolbar={
        <PageToolbar
          search={{
            value: search,
            placeholder: 'Введите ключевое слово для поиска',
            onChange: handleSearchChange,
          }}
        />
      }
    >
      <PaginatedTable
        data={requests}
        columns={columns}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading || isFetching}
        emptyText="Заявки не найдены"
        getRowId={(row) => row.id}
        onPageChange={setPage}
      />
    </PageLayout>
  );
}
