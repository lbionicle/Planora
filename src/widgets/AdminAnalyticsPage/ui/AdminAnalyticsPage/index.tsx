'use client';

import { ReactNode, useMemo, useState } from 'react';
import { toast } from 'sonner';

import {
  useExportAdminGeneralAnalyticsReportMutation,
  useGetAdminGeneralAnalyticsQuery,
} from '@/entities/event/api/adminAnalyticsApi';
import { getApiErrorMessage } from '@/shared/lib';
import AnalyticsAreaChart from '@/shared/ui/AnalyticsAreaChart';
import AnalyticsBarChart, {
  AnalyticsBarChartPoint,
} from '@/shared/ui/AnalyticsBarChart';
import AnalyticsCard from '@/shared/ui/AnalyticsCard';
import AnalyticsEmpty from '@/shared/ui/AnalyticsEmpty';
import AnalyticsExportCard from '@/shared/ui/AnalyticsExportCard';
import {
  EventsFillIcon,
  FileFillIcon,
  OrganizerFillIcon,
  UsersFillIcon,
} from '@/shared/ui/Icons';
import PageLayout from '@/shared/ui/PageLayout';
import Tabs from '@/shared/ui/Tabs';

import {
  formatChartDate,
  formatChartTooltipDate,
  getDefaultDateFrom,
  getDefaultDateTo,
} from '../../lib/formatAdminAnalytics';
import { AdminAnalyticsTab, adminAnalyticsTabs } from '../../model/constants';
import AdminAnalyticsDateRange from '../AdminAnalyticsDateRange';
import AdminAnalyticsSummaryCard from '../AdminAnalyticsSummaryCard';
import AdminPartialAnalytics from '../AdminPartialAnalytics';
import * as S from './styled';

export default function AdminAnalyticsPage(): ReactNode {
  const [activeTab, setActiveTab] = useState<AdminAnalyticsTab>('general');
  const [dateFrom, setDateFrom] = useState(getDefaultDateFrom);
  const [dateTo, setDateTo] = useState(getDefaultDateTo);

  const { data, isLoading, isFetching, isError } =
    useGetAdminGeneralAnalyticsQuery(
      {
        date_from: dateFrom,
        date_to: dateTo,
      },
      {
        skip: activeTab !== 'general',
      },
    );

  const [exportGeneralAnalyticsReport, { isLoading: isExportLoading }] =
    useExportAdminGeneralAnalyticsReportMutation();

  const analytics = data?.data;

  const registrationsChartData = useMemo<AnalyticsBarChartPoint[]>(() => {
    return (analytics?.registrations_by_day ?? []).map((point) => ({
      date: point.date,
      label: formatChartDate(point.date),
      tooltipLabel: formatChartTooltipDate(point.date),
      value: point.value,
    }));
  }, [analytics?.registrations_by_day]);

  const eventsChartData = useMemo<AnalyticsBarChartPoint[]>(() => {
    return (analytics?.events_by_day ?? []).map((point) => ({
      date: point.date,
      label: formatChartDate(point.date),
      tooltipLabel: formatChartTooltipDate(point.date),
      value: point.value,
    }));
  }, [analytics?.events_by_day]);

  const isInitialLoading = isLoading && !analytics;
  const isUpdating = isFetching && Boolean(analytics);

  const handleExportReport = async (): Promise<void> => {
    try {
      await exportGeneralAnalyticsReport({
        date_from: dateFrom,
        date_to: dateTo,
        filename: 'admin-general-analytics.xlsx',
      }).unwrap();

      toast.success('Отчёт успешно экспортирован.');
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <PageLayout
      title="Аналитика"
      headerRight={
        activeTab === 'general' ? (
          <AdminAnalyticsDateRange
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateFromChange={setDateFrom}
            onDateToChange={setDateTo}
          />
        ) : undefined
      }
      toolbar={
        <Tabs
          items={adminAnalyticsTabs}
          value={activeTab}
          onChange={setActiveTab}
        />
      }
    >
      {activeTab === 'general' && (
        <>
          {isInitialLoading && (
            <AnalyticsEmpty text="Загрузка общей аналитики..." />
          )}

          {isError && (
            <AnalyticsEmpty text="Не удалось загрузить общую аналитику." />
          )}

          {analytics && (
            <S.GeneralGrid $isUpdating={isUpdating}>
              <S.MainColumn>
                <AnalyticsCard title="Динамика регистраций">
                  <AnalyticsBarChart
                    data={registrationsChartData}
                    valueName="Регистрации"
                    emptyText="Регистраций за выбранный период нет"
                  />
                </AnalyticsCard>

                <AnalyticsCard title="Динамика создания мероприятий">
                  <AnalyticsAreaChart
                    data={eventsChartData}
                    valueName="Мероприятия"
                    emptyText="Мероприятия за выбранный период не создавались"
                  />
                </AnalyticsCard>
              </S.MainColumn>

              <S.Sidebar>
                <AdminAnalyticsSummaryCard
                  title="Новые организаторы"
                  value={analytics.organizers_count}
                  icon={<OrganizerFillIcon />}
                  growthPercent={analytics.organizers_growth_percent}
                />

                <AdminAnalyticsSummaryCard
                  title="Новые участники"
                  value={analytics.participants_count}
                  icon={<UsersFillIcon />}
                  growthPercent={analytics.participants_growth_percent}
                />

                <AdminAnalyticsSummaryCard
                  title="Мероприятия"
                  value={analytics.events_count}
                  icon={<EventsFillIcon />}
                  growthPercent={analytics.events_growth_percent}
                />

                <AdminAnalyticsSummaryCard
                  title="Заявки"
                  value={analytics.registrations_count}
                  icon={<FileFillIcon />}
                  growthPercent={analytics.registrations_growth_percent}
                />

                <AnalyticsExportCard
                  title="Экспорт отчёта"
                  description="XLSX с общей аналитикой за выбранный период"
                  isDisabled={isExportLoading}
                  onClick={handleExportReport}
                />
              </S.Sidebar>
            </S.GeneralGrid>
          )}
        </>
      )}

      {activeTab === 'partial' && <AdminPartialAnalytics />}
    </PageLayout>
  );
}
