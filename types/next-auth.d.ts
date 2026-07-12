import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      guestId?: string | null;
    };
  }

  interface User {
    guestId?: string | null;
  }
}
