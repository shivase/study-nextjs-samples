import { atom } from 'recoil';

import { UserAuth } from '../types';

export const userState = atom<UserAuth | null>({
  key: 'userState',
  default: null,
});
