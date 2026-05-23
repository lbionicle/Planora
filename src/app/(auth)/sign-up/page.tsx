import type { ReactNode } from 'react';

import SignUpForm from '@/features/auth/ui/SignUpForm';
import { getSearchParamValue } from '@/lib/getSearchParamValue';

interface SignUpPageProps {
  searchParams: Promise<{
    callbackUrl?: string | string[];
  }>;
}

export default async function SignUpPage({
  searchParams,
}: SignUpPageProps): Promise<ReactNode> {
  const params = await searchParams;
  const callbackUrl = getSearchParamValue(params.callbackUrl);

  return <SignUpForm callbackUrl={callbackUrl} />;
}
