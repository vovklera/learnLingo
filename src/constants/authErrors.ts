export const AUTH_ERRORS: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already in use.',
  'auth/invalid-email': 'Invalid email address.',
  'auth/network-request-failed': 'Network error. Please try again.',
};

export const LOGIN_ERRORS: Record<string, string> = {
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/user-not-found': 'Invalid email or password.',
  'auth/wrong-password': 'Invalid email or password.',
  'auth/user-disabled': 'This account has been disabled. Please contact support.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please try again.',
};
