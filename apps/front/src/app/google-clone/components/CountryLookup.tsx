'use client';

import { useEffect, useState } from 'react';

import { NEXT_PUBLIC_EXTREME_IP_LOOKUP_API_KEY } from '../config';

const CountryLookup = () => {
  const [country, setCountry] = useState('United States');

  useEffect(() => {
    const getCountry = async () => {
      const request = `https://extreme-ip-lookup.com/json/?key=${NEXT_PUBLIC_EXTREME_IP_LOOKUP_API_KEY}`;
      const res = await fetch(request);
      if (res.ok) {
        const data = await res.json();
        setCountry(data.country);
      }
    };
    getCountry();
  }, []);

  return <>{country}</>;
};

export default CountryLookup;
