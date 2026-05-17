import { z } from 'zod';

import {
  EventCategory,
  EventFormat,
  EventStatus,
  EventVisibility,
} from '@/entities/event/model/types';

export interface EventFormValues {
  title: string;
  description: string;
  category: EventCategory;
  visibility: EventVisibility;
  format: EventFormat;
  status: EventStatus;
  tickets_count: string;
  starts_at: string;
  ends_at: string;
  country: string;
  region: string;
  city: string;
  postal_code: string;
  address: string;
  online_url: string;
}

export const eventFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, 'Введите название мероприятия')
      .max(255, 'Название не должно быть длиннее 255 символов'),
    description: z
      .string()
      .trim()
      .min(1, 'Введите описание мероприятия')
      .max(5000, 'Описание не должно быть длиннее 5000 символов'),
    category: z.nativeEnum(EventCategory),
    visibility: z.nativeEnum(EventVisibility),
    format: z.nativeEnum(EventFormat),
    status: z.nativeEnum(EventStatus),
    tickets_count: z.string().trim().min(1, 'Введите количество мест'),
    starts_at: z.string().min(1, 'Укажите дату начала'),
    ends_at: z.string().min(1, 'Укажите дату окончания'),
    country: z.string(),
    region: z.string(),
    city: z.string(),
    postal_code: z.string(),
    address: z.string(),
    online_url: z.string(),
  })
  .superRefine((values, context) => {
    const startsAt = new Date(values.starts_at);
    const endsAt = new Date(values.ends_at);

    const startsAtTime = startsAt.getTime();
    const endsAtTime = endsAt.getTime();

    const isStartsAtValid = !Number.isNaN(startsAtTime);
    const isEndsAtValid = !Number.isNaN(endsAtTime);

    const now = new Date();
    now.setSeconds(0, 0);

    if (!isStartsAtValid) {
      context.addIssue({
        code: 'custom',
        path: ['starts_at'],
        message: 'Укажите корректную дату начала',
      });
    }

    if (!isEndsAtValid) {
      context.addIssue({
        code: 'custom',
        path: ['ends_at'],
        message: 'Укажите корректную дату окончания',
      });
    }

    if (isStartsAtValid && startsAt < now) {
      context.addIssue({
        code: 'custom',
        path: ['starts_at'],
        message: 'Дата начала не может быть в прошлом',
      });
    }

    if (isEndsAtValid && endsAt < now) {
      context.addIssue({
        code: 'custom',
        path: ['ends_at'],
        message: 'Дата окончания не может быть в прошлом',
      });
    }

    if (isStartsAtValid && isEndsAtValid && endsAt <= startsAt) {
      context.addIssue({
        code: 'custom',
        path: ['ends_at'],
        message: 'Дата окончания должна быть позже даты начала',
      });
    }

    const ticketsCount = Number(values.tickets_count);

    if (!Number.isInteger(ticketsCount) || ticketsCount <= 0) {
      context.addIssue({
        code: 'custom',
        path: ['tickets_count'],
        message: 'Количество мест должно быть положительным числом',
      });
    }

    if (values.format === EventFormat.OFFLINE) {
      if (!values.country.trim()) {
        context.addIssue({
          code: 'custom',
          path: ['country'],
          message: 'Введите страну',
        });
      }

      if (!values.city.trim()) {
        context.addIssue({
          code: 'custom',
          path: ['city'],
          message: 'Введите город',
        });
      }

      if (!values.address.trim()) {
        context.addIssue({
          code: 'custom',
          path: ['address'],
          message: 'Введите адрес',
        });
      }
    }

    if (values.format === EventFormat.ONLINE) {
      const result = z.string().url().safeParse(values.online_url.trim());

      if (!values.online_url.trim()) {
        context.addIssue({
          code: 'custom',
          path: ['online_url'],
          message: 'Введите ссылку на онлайн-мероприятие',
        });
      } else if (!result.success) {
        context.addIssue({
          code: 'custom',
          path: ['online_url'],
          message: 'Введите корректную ссылку',
        });
      }
    }
  });
