import { FirebaseError } from 'firebase/app';

const DEFAULT_AUTH_ERROR = 'Something went wrong. Please try again.';

export const getAuthErrorMessage = (code: string | null, errors: Record<string, string>) => {
  return code ? (errors[code] ?? DEFAULT_AUTH_ERROR) : DEFAULT_AUTH_ERROR;
};

export const handleAuthError = (error: unknown) => {
  if (error instanceof FirebaseError) {
    return {
      success: false as const,
      code: error.code,
    };
  }

  return {
    success: false as const,
    code: null,
  };
};
