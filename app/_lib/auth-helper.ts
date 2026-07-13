import type { Session } from 'next-auth';
import { auth } from './auth';

type AuthenticatedSession = Session & {
  user: Session['user'] & { email: string; id: number; guestId: number };
};

export async function getRequiredSession(): Promise<AuthenticatedSession> {
  const session = await auth();

  if (!session?.user?.email) {
    // This should be unreachable if middleware is doing its job.
    // Throwing (rather than silently casting) protects you if that ever changes.
    throw new Error('getRequiredSession called on an unprotected route');
  }

  return session as AuthenticatedSession;
}
