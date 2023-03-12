import axios from 'axios';
import useSWR from 'swr';

import { News } from '../types';

const fetcher = async (url: string): Promise<News> => {
  const ret = await axios.get(url);

  return ret.data;
};

export const useNews = () => {
  const {
    data: news,
    error,
    isLoading,
  } = useSWR('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json', fetcher);

  return {
    news: news,
    error: error,
    loading: isLoading,
  };
};
