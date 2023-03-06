'use client';

import { useEffect } from 'react';

const ErrorPage = ({ error, reset }: { error: string; reset: () => void }) => {
  useEffect(() => {
    console.log('hogehogehogehogeho');
    console.log(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <h1 className="mb-4 text-3xl">{error}</h1>
      <button className="text-blue-500" onClick={reset}>
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
