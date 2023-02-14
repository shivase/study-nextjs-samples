import { User } from 'database';

export type UserInfo = Pick<
  User,
  'first_name' | 'last_name' | 'password' | 'city' | 'email' | 'phone'
>;
