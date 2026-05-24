import { z } from 'zod';

export const eventInvitationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Введите почту получателя')
    .email('Введите корректную почту'),
});

export type EventInvitationFormValues = z.infer<typeof eventInvitationSchema>;
