import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      uid?: string;
      username?: string;
    } & DefaultSession['user'];
  }
}
