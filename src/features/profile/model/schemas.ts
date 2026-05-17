import { z } from 'zod';

import { UserRole } from '@/entities/user/model/types';

export interface ProfileFormValues {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  current_password?: string;
  new_password?: string;
}

interface PasswordFields {
  current_password?: string;
  new_password?: string;
}

function validatePasswordFields(
  values: PasswordFields,
  context: z.RefinementCtx,
): void {
  const currentPassword = values.current_password?.trim();
  const newPassword = values.new_password?.trim();

  if (!newPassword) {
    return;
  }

  if (!currentPassword) {
    context.addIssue({
      code: 'custom',
      path: ['current_password'],
      message: 'Введите текущий пароль',
    });
  }

  if (newPassword.length < 8) {
    context.addIssue({
      code: 'custom',
      path: ['new_password'],
      message: 'Новый пароль должен быть не короче 8 символов',
    });
  }

  if (newPassword.length > 128) {
    context.addIssue({
      code: 'custom',
      path: ['new_password'],
      message: 'Новый пароль не должен быть длиннее 128 символов',
    });
  }
}

const participantProfileSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(1, 'Введите имя')
      .max(100, 'Имя не должно быть длиннее 100 символов'),
    last_name: z
      .string()
      .trim()
      .min(1, 'Введите фамилию')
      .max(100, 'Фамилия не должна быть длиннее 100 символов'),
    company_name: z.string().optional(),
    current_password: z.string().optional(),
    new_password: z.string().optional(),
  })
  .superRefine((values, context) => {
    validatePasswordFields(values, context);
  });

const organizerProfileSchema = z
  .object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    company_name: z
      .string()
      .trim()
      .min(1, 'Введите название компании')
      .max(255, 'Название компании не должно быть длиннее 255 символов'),
    current_password: z.string().optional(),
    new_password: z.string().optional(),
  })
  .superRefine((values, context) => {
    validatePasswordFields(values, context);
  });

const adminProfileSchema = z
  .object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    company_name: z.string().optional(),
    current_password: z.string().optional(),
    new_password: z.string().optional(),
  })
  .superRefine((values, context) => {
    validatePasswordFields(values, context);
  });

export function getProfileSchema(role?: UserRole) {
  if (role === UserRole.PARTICIPANT) {
    return participantProfileSchema;
  }

  if (role === UserRole.ORGANIZER) {
    return organizerProfileSchema;
  }

  return adminProfileSchema;
}
