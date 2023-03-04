'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

export const ProviderPage = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <ThemeProvider enableSystem={true} attribute="class">
          <div className="min-h-screen select-none text-gray-700 transition-colors duration-300 dark:bg-gray-700 dark:text-gray-200">
            {children}
          </div>
        </ThemeProvider>
      )}
    </>
  );
};
