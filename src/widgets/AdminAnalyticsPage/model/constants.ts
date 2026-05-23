import { TabItem } from '@/shared/ui/Tabs';

export type AdminAnalyticsTab = 'general' | 'partial';

export const adminAnalyticsTabs: TabItem<AdminAnalyticsTab>[] = [
  {
    label: 'Общая',
    value: 'general',
  },
  {
    label: 'Частичная',
    value: 'partial',
  },
];

export const DEFAULT_ANALYTICS_PERIOD_DAYS = 6;
