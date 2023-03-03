'use client';
import { useState, createContext, useEffect } from 'react';

import useAuth from '@/app/open-table/hooks/useAuth';
import { UserInfo } from '@/app/open-table/types';

type State = {
  loading: boolean;
  data: UserInfo | null;
  error: string | null;
};

type AuthState = {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
} & State;

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {},
});

const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  const { fetchUser } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await fetchUser();
        setAuthState({
          loading: false,
          data: user,
          error: null,
        });
      } catch (error: any) {
        setAuthState({
          data: null,
          error: error.response.data.errorMessage,
          loading: false,
        });
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
