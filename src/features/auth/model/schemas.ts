import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Введите почту')
    .email('Введите корректную почту'),
  password: z.string().min(1, 'Введите пароль'),
});

export const participantSignUpSchema = z.object({
  first_name: z.string().trim().min(1, 'Введите имя'),
  last_name: z.string().trim().min(1, 'Введите фамилию'),
  email: z
    .string()
    .trim()
    .min(1, 'Введите почту')
    .email('Введите корректную почту'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
});

export const organizerSignUpSchema = z.object({
  company_name: z.string().trim().min(1, 'Введите название компании'),
  corporate_email: z
    .string()
    .trim()
    .min(1, 'Введите корпоративную почту')
    .email('Введите корректную почту'),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов'),
  verification_file: z.custom<FileList>(
    (value) => value instanceof FileList && value.length > 0,
    'Загрузите файл для подтверждения юр. лица',
  ),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export type ParticipantSignUpFormValues = z.infer<
  typeof participantSignUpSchema
>;

export type OrganizerSignUpFormValues = z.infer<typeof organizerSignUpSchema>;
