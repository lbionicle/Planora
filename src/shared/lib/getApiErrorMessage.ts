import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type ApiErrorData = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: {
      field: string;
      message: string;
    }[];
  };
};

export function getApiErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const queryError = error as FetchBaseQueryError;

    const data = queryError.data as ApiErrorData | undefined;

    if (data?.error?.message) {
      return data.error.message;
    }
  }

  return 'Произошла ошибка. Попробуйте ещё раз.';
}
