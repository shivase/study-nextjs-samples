import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import { useContext } from 'react';

import { AuthenticationContext } from '@/app/open-table/context/AuthContext';
import { UserInfo } from '@/app/open-table/types';

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const signin = async (
    { email, password }: { email: string; password: string },
    handleClose: () => void,
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', {
        email,
        password,
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const signup = async (
    { email, password, first_name, last_name, city, phone }: UserInfo,
    handleClose: () => void,
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        email,
        password,
        first_name,
        last_name,
        city,
        phone,
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const fetchUser = async () => {
    const jwt = getCookie('jwt');
    if (jwt) {
      const response = await axios.get('http://localhost:3000/api/open-table/auth/me', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

      return response.data;
    }
  };

  const signout = () => {
    deleteCookie('jwt');
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return {
    signin,
    signup,
    signout,
    fetchUser,
  };
};

export default useAuth;
