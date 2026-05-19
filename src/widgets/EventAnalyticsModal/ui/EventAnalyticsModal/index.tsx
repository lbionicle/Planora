'use client';

import { ReactNode, useMemo } from 'react';

import { EventAnalyticsDetail } from '@/entities/event/model/analyticsTypes';
import EventInfoList from '@/entities/event/ui/EventInfoList';
import { formatDateTime } from '@/shared/lib';
import AnalyticsAreaChart, {
  AnalyticsAreaChartPoint,
} from '@/shared/ui/AnalyticsAreaChart';
import AnalyticsCard from '@/shared/ui/AnalyticsCard';
import AnalyticsExportCard from '@/shared/ui/AnalyticsExportCard';
import AnalyticsOccupancyCard from '@/shared/ui/AnalyticsOccupancyCard';
import AnalyticsPieChart, {
  AnalyticsPieSegment,
} from '@/shared/ui/AnalyticsPieChart';
import { CalendarIcon, LocationIcon, OrganizerIcon } from '@/shared/ui/Icons';
import Modal from '@/shared/ui/Modal';

import * as S from './styled';

interface EventAnalyticsModalProps {
  isOpen: boolean;
  analytics: EventAnalyticsDetail | null;
  isLoading?: boolean;
  onClose: () => void;
  onExportReport?: (analytics: EventAnalyticsDetail) => void;
}

function formatChartDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short',
    day: '2-digit',
  }).format(date);
}

export default function EventAnalyticsModal({
  isOpen,
  analytics,
  isLoading = false,
  onClose,
  onExportReport,
}: EventAnalyticsModalProps): ReactNode {
  const registrationChartData = useMemo<AnalyticsAreaChartPoint[]>(() => {
    return (analytics?.registrations_by_day ?? []).map((point) => ({
      label: formatChartDate(point.date),
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

  const handleExportReport = (): void => {
    if (!analytics) {
      return;
    }

    onExportReport?.(analytics);
  };

  return (
    <Modal isOpen={isOpen} title={analytics?.title} size="xl" onClose={onClose}>
      {isLoading && <S.Empty>Загрузка аналитики мероприятия...</S.Empty>}

      {!isLoading && !analytics && (
        <S.Empty>Не удалось загрузить аналитику мероприятия.</S.Empty>
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
              <S.CardSlot>
                <AnalyticsOccupancyCard
                  percent={analytics.occupancy_percent}
                  availableCount={analytics.available_tickets_count}
                  occupiedCount={analytics.registered_tickets_count}
                  totalCount={analytics.tickets_count}
                />
              </S.CardSlot>

              <S.CardSlot>
                <AnalyticsCard title="Статусы откликов RSVP">
                  <AnalyticsPieChart
                    segments={rsvpSegments}
                    emptyText="RSVP-ответов пока нет"
                  />
                </AnalyticsCard>
              </S.CardSlot>
            </S.LeftColumn>

            <S.RightColumn>
              <S.CardSlot>
                <AnalyticsCard title="Динамика регистраций по мероприятию">
                  <AnalyticsAreaChart
                    data={registrationChartData}
                    valueName="Регистрации"
                    emptyText="Регистраций по мероприятию пока нет"
                  />
                </AnalyticsCard>
              </S.CardSlot>

              <S.CardSlot>
                <AnalyticsExportCard
                  title="Экспорт отчёта"
                  description="XLSX с аналитикой по выбранному мероприятию"
                  onClick={handleExportReport}
                />
              </S.CardSlot>
            </S.RightColumn>
          </S.Grid>
        </S.Content>
      )}
    </Modal>
  );
}
