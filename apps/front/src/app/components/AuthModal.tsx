'use client';

import { Alert, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import clsx from 'clsx';
import { FC, useContext, useEffect, useState } from 'react';

import { UserInfo } from '@/app/types';
import { AuthenticationContext } from '@/context/AuthContext';
import useAuth from '@/hooks/useAuth';

import AuthModalInput from './AuthModalInputs';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type LoginModalProps = {
  isSignIn: boolean;
};

export const AuthModal: FC<LoginModalProps> = ({ isSignIn }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disabled, setDisabled] = useState(true);
  const { signin, signup } = useAuth();
  const { loading, error } = useContext(AuthenticationContext);

  const [inputs, setInputs] = useState<UserInfo>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  useEffect(() => {
    if (isSignIn) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.first_name &&
        inputs.last_name &&
        inputs.phone &&
        inputs.city &&
        inputs.password &&
        inputs.email
      ) {
        return setDisabled(false);
      }
    }
  }, [inputs, isSignIn]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(inputs, handleClose);
    }
  };

  return (
    <div>
      <button
        className={clsx(
          isSignIn
            ? 'mr-3 rounded border bg-blue-400 p-1 px-4 text-white'
            : 'rounded border p-1 px-4',
        )}
        onClick={handleOpen}>
        {isSignIn ? 'Sign in' : 'Sign up'}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="">
        <Box sx={style}>
          {loading ? (
            <div className="flex h-[600px] justify-center px-2 py-24">
              <CircularProgress />
            </div>
          ) : (
            <div className="h-[600px] p-2">
              {error && (
                <Alert severity="error" className="mb-4">
                  {error}
                </Alert>
              )}
              <div className="mb-2 border-b pb-2 text-center font-bold uppercase">
                <p className="text-sm">{isSignIn ? 'Sign in' : 'Create account'}</p>
              </div>
              <div className="m-auto">
                <h2 className="text-center text-2xl font-light">
                  {isSignIn ? 'Log Into Your Account' : 'Create Your OpenTable Account'}
                </h2>
                <AuthModalInput
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button
                  className="mb-5 w-full rounded bg-red-600 p-3 text-sm uppercase text-white disabled:bg-gray-400 "
                  disabled={disabled}
                  onClick={handleClick}>
                  {isSignIn ? 'Sign In' : 'Create Account'}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
