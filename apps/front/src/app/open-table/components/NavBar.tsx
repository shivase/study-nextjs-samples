'use client';
import Link from 'next/link';
import { useContext } from 'react';

import { AuthenticationContext } from '@/app/open-table/context/AuthContext';
import useAuth from '@/app/open-table/hooks/useAuth';

import AuthModal from './AuthModal';

const NavBar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();

  const handler = () => {
    signout();
  };

  return (
    <nav className="flex justify-between bg-white p-2">
      <Link href="/open-table" className="text-2xl font-bold text-gray-700">
        OpenTable
      </Link>
      <div>
        {!loading && (
          <div className="flex">
            {data ? (
              <button className="rounded border bg-blue-400 p-1 px-4 text-white" onClick={handler}>
                Signout
              </button>
            ) : (
              <>
                <AuthModal isSignIn={true} />
                <AuthModal isSignIn={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
