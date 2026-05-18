import { ComponentType, SVGProps } from 'react';

import { UserRole } from '@/entities/user/model/types';
import { routes } from '@/shared/model';
import {
  AnalyticsFillIcon,
  AnalyticsIcon,
  EventsFillIcon,
  EventsIcon,
  HeartFillIcon,
  HeartIcon,
  RequestsFillIcon,
  RequestsIcon,
  TicketFillIcon,
  TicketIcon,
  UsersFillIcon,
  UsersIcon,
} from '@/shared/ui/Icons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavigationItem {
  label: string;
  href: string;
  Icon: IconComponent;
  ActiveIcon: IconComponent;
}

export const publicNavigationItems: NavigationItem[] = [
  {
    label: 'Мероприятия',
    href: routes.public.events,
    Icon: EventsIcon,
    ActiveIcon: EventsFillIcon,
  },
];

export const adminNavigationItems: NavigationItem[] = [
  {
    label: 'Заявки',
    href: routes.admin.requests,
    Icon: RequestsIcon,
    ActiveIcon: RequestsFillIcon,
  },
  {
    label: 'Пользователи',
    href: routes.admin.users,
    Icon: UsersIcon,
    ActiveIcon: UsersFillIcon,
  },
  {
    label: 'Аналитика',
    href: routes.admin.analytics,
    Icon: AnalyticsIcon,
    ActiveIcon: AnalyticsFillIcon,
  },
];

export const organizerNavigationItems: NavigationItem[] = [
  {
    label: 'Мероприятия',
    href: routes.organizer.events,
    Icon: EventsIcon,
    ActiveIcon: EventsFillIcon,
  },
  {
    label: 'Аналитика',
    href: routes.organizer.analytics,
    Icon: AnalyticsIcon,
    ActiveIcon: AnalyticsFillIcon,
  },
];

export const participantNavigationItems: NavigationItem[] = [
  {
    label: 'Мероприятия',
    href: routes.public.events,
    Icon: EventsIcon,
    ActiveIcon: EventsFillIcon,
  },
  {
    label: 'Избранное',
    href: routes.participant.favorites,
    Icon: HeartIcon,
    ActiveIcon: HeartFillIcon,
  },
  {
    label: 'Билеты',
    href: routes.participant.tickets,
    Icon: TicketIcon,
    ActiveIcon: TicketFillIcon,
  },
];

export const navigationByRole: Partial<Record<UserRole, NavigationItem[]>> = {
  [UserRole.ADMIN]: adminNavigationItems,
  [UserRole.ORGANIZER]: organizerNavigationItems,
  [UserRole.PARTICIPANT]: participantNavigationItems,
};

export function getNavigationItems(role?: UserRole | null): NavigationItem[] {
  if (!role) {
    return publicNavigationItems;
  }

  return navigationByRole[role] ?? [];
}

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
