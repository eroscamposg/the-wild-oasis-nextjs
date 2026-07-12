import NextAuth, { type NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        const existingGuess = await getGuest(user.email);
        if (!existingGuess)
          await createGuest({
            email: user.email,
            full_name: user.name,
          });

        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session }) {
      if (!session.user.email) return session;

      const guest = await getGuest(session.user.email);
      session.user.guestId = guest?.id;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
