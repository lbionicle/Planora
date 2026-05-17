import { z } from 'zod';

import { UserRole } from '@/entities/user/model/types';

export interface ProfileFormValues {
  email?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  current_password?: string;
  new_password?: string;
}

interface ProfileSchemaOptions {
  validateEmail?: boolean;
  validatePassword?: boolean;
}

function addRequiredIssue(
  context: z.RefinementCtx,
  path: keyof ProfileFormValues,
  message: string,
): void {
  context.addIssue({
    code: 'custom',
    path: [path],
    message,
  });
}

function validateTextLength(
  value: string,
  context: z.RefinementCtx,
  path: keyof ProfileFormValues,
  maxLength: number,
  message: string,
): void {
  if (value.length > maxLength) {
    context.addIssue({
      code: 'custom',
      path: [path],
      message,
    });
  }
}

function validateEmailField(
  value: string | undefined,
  context: z.RefinementCtx,
): void {
  const email = value?.trim();

  if (!email) {
    addRequiredIssue(context, 'email', 'Введите почту');
    return;
  }

  const result = z.string().email().safeParse(email);

  if (!result.success) {
    context.addIssue({
      code: 'custom',
      path: ['email'],
      message: 'Введите корректную почту',
    });
  }
}

function validatePasswordFields(
  values: ProfileFormValues,
  context: z.RefinementCtx,
): void {
  const currentPassword = values.current_password?.trim();
  const newPassword = values.new_password?.trim();

  if (!newPassword) {
    return;
  }

  if (!currentPassword) {
    addRequiredIssue(context, 'current_password', 'Введите текущий пароль');
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

function validateParticipantFields(
  values: ProfileFormValues,
  context: z.RefinementCtx,
): void {
  const firstName = values.first_name?.trim();
  const lastName = values.last_name?.trim();

  if (!firstName) {
    addRequiredIssue(context, 'first_name', 'Введите имя');
  } else {
    validateTextLength(
      firstName,
      context,
      'first_name',
      100,
      'Имя не должно быть длиннее 100 символов',
    );
  }

  if (!lastName) {
    addRequiredIssue(context, 'last_name', 'Введите фамилию');
  } else {
    validateTextLength(
      lastName,
      context,
      'last_name',
      100,
      'Фамилия не должна быть длиннее 100 символов',
    );
  }
}

function validateOrganizerFields(
  values: ProfileFormValues,
  context: z.RefinementCtx,
): void {
  const companyName = values.company_name?.trim();

  if (!companyName) {
    addRequiredIssue(context, 'company_name', 'Введите название компании');
    return;
  }

  validateTextLength(
    companyName,
    context,
    'company_name',
    255,
    'Название компании не должно быть длиннее 255 символов',
  );
}

function createProfileSchema(
  role?: UserRole,
  options: ProfileSchemaOptions = {},
) {
  return z
    .object({
      email: z.string().optional(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      company_name: z.string().optional(),
      current_password: z.string().optional(),
      new_password: z.string().optional(),
    })
    .superRefine((values, context) => {
      if (role === UserRole.PARTICIPANT) {
        validateParticipantFields(values, context);
      }

      if (role === UserRole.ORGANIZER) {
        validateOrganizerFields(values, context);
      }

      if (options.validateEmail) {
        validateEmailField(values.email, context);
      }

      if (options.validatePassword) {
        validatePasswordFields(values, context);
      }
    });
}

export function getProfileSchema(role?: UserRole) {
  return createProfileSchema(role, {
    validatePassword: true,
  });
}

export function getAdminUserEditSchema(role?: UserRole) {
  return createProfileSchema(role, {
    validateEmail: true,
  });
}
