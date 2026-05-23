'use client';

import { ReactNode, useMemo } from 'react';

import { EventAnalyticsDetail } from '@/entities/event/model/analyticsTypes';
import EventInfoList from '@/entities/event/ui/EventInfoList';
import { formatDateTime } from '@/shared/lib';
import AnalyticsAreaChart, {
  AnalyticsAreaChartPoint,
} from '@/shared/ui/AnalyticsAreaChart';
import AnalyticsCard from '@/shared/ui/AnalyticsCard';
import AnalyticsEmpty from '@/shared/ui/AnalyticsEmpty';
import AnalyticsExportCard from '@/shared/ui/AnalyticsExportCard';
import AnalyticsOccupancyCard from '@/shared/ui/AnalyticsOccupancyCard';
import AnalyticsPieChart, {
  AnalyticsPieSegment,
} from '@/shared/ui/AnalyticsPieChart';
import { CalendarIcon, LocationIcon, OrganizerIcon } from '@/shared/ui/Icons';
import Modal from '@/shared/ui/Modal';
import { formatChartTooltipDate } from '@/widgets/AdminAnalyticsPage/lib/formatAdminAnalytics';

import * as S from './styled';

interface EventAnalyticsModalProps {
  isOpen: boolean;
  analytics: EventAnalyticsDetail | null;
  isLoading?: boolean;
  isExportLoading?: boolean;
  onClose: () => void;
  onExportReport?: (analytics: EventAnalyticsDetail) => void | Promise<void>;
}

function formatChartDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
  }).format(date);
}

export default function EventAnalyticsModal({
  isOpen,
  analytics,
  isLoading = false,
  isExportLoading = false,
  onClose,
  onExportReport,
}: EventAnalyticsModalProps): ReactNode {
  const registrationChartData = useMemo<AnalyticsAreaChartPoint[]>(() => {
    return (analytics?.registrations_by_day ?? []).map((point) => ({
      date: point.date,
      label: formatChartDate(point.date),
      tooltipLabel: formatChartTooltipDate(point.date),
      value: point.value,
    }));
  }, [analytics?.registrations_by_day]);

  const rsvpSegments = useMemo<AnalyticsPieSegment[]>(() => {
    if (!analytics) {
      return [];
    }

    return [
      {
        key: 'accepted',
        label: 'Подтвердили участие',
        value: analytics.rsvp_accepted_count,
        tone: 'accent',
      },
      {
        key: 'declined',
        label: 'Отказались',
        value: analytics.rsvp_declined_count,
        tone: 'info',
      },
      {
        key: 'waiting',
        label: 'Ожидают ответа',
        value: analytics.rsvp_waiting_count,
        tone: 'neutral',
      },
    ];
  }, [analytics]);

  const handleExportReport = async (): Promise<void> => {
    if (!analytics || !onExportReport) {
      return;
    }

    await onExportReport(analytics);
  };

  return (
    <Modal isOpen={isOpen} title={analytics?.title} size="xl" onClose={onClose}>
      {isLoading && <AnalyticsEmpty text="Загрузка аналитики мероприятия..." />}

      {!isLoading && !analytics && (
        <AnalyticsEmpty text="Не удалось загрузить аналитику мероприятия." />
      )}

      {!isLoading && analytics && (
        <S.Content>
          <EventInfoList
            items={[
              {
                key: 'organizer',
                icon: <OrganizerIcon />,
                text: analytics.organizer_name,
              },
              {
                key: 'date',
                icon: <CalendarIcon />,
                text: formatDateTime(analytics.starts_at),
              },
              {
                key: 'location',
                icon: <LocationIcon />,
                text: analytics.location,
                title: analytics.location,
              },
            ]}
          />

          <S.Grid>
            <S.LeftColumn>
              <AnalyticsOccupancyCard
                percent={analytics.occupancy_percent}
                availableCount={analytics.available_tickets_count}
                occupiedCount={analytics.registered_tickets_count}
                totalCount={analytics.tickets_count}
              />

              <AnalyticsCard title="Статусы откликов RSVP">
                <AnalyticsPieChart
                  segments={rsvpSegments}
                  emptyText="RSVP-ответов пока нет"
                />
              </AnalyticsCard>
            </S.LeftColumn>

            <S.RightColumn>
              <AnalyticsCard title="Динамика регистраций по мероприятию">
                <AnalyticsAreaChart
                  data={registrationChartData}
                  valueName="Регистрации"
                  emptyText="Регистраций по мероприятию пока нет"
                />
              </AnalyticsCard>

              <AnalyticsExportCard
                title="Экспорт отчёта"
                description="XLSX с аналитикой по выбранному мероприятию"
                isDisabled={isExportLoading || !onExportReport}
                onClick={handleExportReport}
              />
            </S.RightColumn>
          </S.Grid>
        </S.Content>
      )}
    </Modal>
  );
}
