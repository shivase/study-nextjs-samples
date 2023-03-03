import axios from 'axios';
import { useState } from 'react';

const useReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    booker_first_name,
    booker_last_name,
    booker_phone,
    booker_email,
    booker_occasion,
    booker_request,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
    booker_first_name: string;
    booker_last_name: string;
    booker_phone: string;
    booker_email: string;
    booker_occasion?: string;
    booker_request?: string;
  }) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/open-table/restaurant/${slug}/reserve`,
        {
          booker_first_name,
          booker_last_name,
          booker_phone,
          booker_email,
          booker_occasion,
          booker_request,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      setError(error.response.data.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createReservation,
  };
};

export default useReservation;
