import axios from 'axios';
import useSWR from 'swr';

import { User } from '../types';

const fetcher = async (url: string): Promise<User[]> => {
  const ret = await axios.get(url);

  return ret.data.results;
};

export const useUsers = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useSWR('https://randomuser.me/api/?results=30&inc=name,login,picture', fetcher);

  return {
    users: users,
    error: error,
    loading: isLoading,
  };
};
