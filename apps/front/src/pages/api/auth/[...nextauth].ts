import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@/config/twitter-clone';

const auth = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/twitter-clone/auth/signin',
  },
  callbacks: {
    session: async ({ session, token }) => {
      session.user.username = session.user.name?.split(' ').join('').toLowerCase();
      session.user.uid = token.sub;

      return session;
    },
  },
});

export default auth;
