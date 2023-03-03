import axios from 'axios';
import { useState } from 'react';

import { AvailableTime } from '@/app/open-table/types';

const useAvailabilities = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<AvailableTime[] | null>(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
  }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/open-table/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        },
      );
      setData(response.data);
    } catch (error: any) {
      setError(error.response.data.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    fetchAvailabilities,
  };
};

export default useAvailabilities;
