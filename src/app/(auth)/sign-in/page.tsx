import { ReactNode } from 'react';

import SignInForm from '@/features/auth/ui/SignInForm';
import { getSearchParamValue } from '@/lib/getSearchParamValue';

interface SignInPageProps {
  searchParams: Promise<{
    callbackUrl?: string | string[];
  }>;
}

export default async function SignInPage({
  searchParams,
}: SignInPageProps): Promise<ReactNode> {
  const params = await searchParams;

  return <SignInForm callbackUrl={getSearchParamValue(params.callbackUrl)} />;
}
