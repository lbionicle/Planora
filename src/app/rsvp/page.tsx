import { ReactNode } from 'react';

import { getSearchParamValue } from '@/lib/getSearchParamValue';
import RsvpResponsePage from '@/widgets/RsvpResponsePage/ui/RsvpResponsePage';

interface RsvpPageProps {
  searchParams: Promise<{
    token?: string | string[];
  }>;
}

export default async function RsvpPage({
  searchParams,
}: RsvpPageProps): Promise<ReactNode> {
  const params = await searchParams;
  const token = getSearchParamValue(params.token) ?? '';

  return <RsvpResponsePage token={token} />;
}
