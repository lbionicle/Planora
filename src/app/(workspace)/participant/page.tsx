import { redirect } from 'next/navigation';

import { routes } from '@/shared/model/routes';

export default function Page() {
  redirect(routes.participant.tickets);
}
