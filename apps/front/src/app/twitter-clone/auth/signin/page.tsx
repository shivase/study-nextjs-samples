'use client';

import { useAuthentication } from '../../hooks/useAuthentication';

const AuthSignIn = () => {
  const { signIn } = useAuthentication();

  const onGoogleClick = async () => {
    signIn();
  };

  return (
    <div className="mt-20 flex justify-center space-x-4">
      <img
        src="https://icons-for-free.com/iconfiles/png/512/iphone+phone+twitter+logo+icon-1320195967629219142.png"
        alt="twitter inside a phone"
        className="hidden rotate-6 object-cover md:inline-flex md:h-80 md:w-44"
      />

      <div className="">
        <div className="flex flex-col items-center">
          <img
            src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
            alt="twitter logo"
            className="w-36 object-cover"
          />
          <p className="my-10 text-center text-sm italic">
            This app is created for learning purpose
          </p>
          <button
            onClick={onGoogleClick}
            className="rounded-lg bg-red-400 p-3 text-white hover:bg-red-500">
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

// Using next-auth program
//import { getProviders, signIn } from 'next-auth/react';
//import useSWR from 'swr';
//const AuthSignIn = () => {
//  const { data: providers, error } = useSWR('/api/auth/providers', () => getProviders());
//
//  if (error) return <p>Error : {error}</p>;
//
//  return (
//    <div className="mt-20 flex justify-center space-x-4">
//      <img
//        src="https://icons-for-free.com/iconfiles/png/512/iphone+phone+twitter+logo+icon-1320195967629219142.png"
//        alt="twitter inside a phone"
//        className="hidden rotate-6 object-cover md:inline-flex md:h-80 md:w-44"
//      />
//      <div className="">
//        {providers &&
//          Object.values(providers).map((provider) => (
//            <div key={provider.id} className="flex flex-col items-center">
//              <img
//                src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
//                alt="twitter logo"
//                className="w-36 object-cover"
//              />
//              <p className="my-10 text-center text-sm italic">
//                This app is created for learning purpose
//              </p>
//              <button
//                onClick={() => signIn(provider.id, { callbackUrl: '/twitter-clone' })}
//                className="rounded-lg bg-red-400 p-3 text-white hover:bg-red-500">
//                Sign in with {provider.name}
//              </button>
//            </div>
//          ))}
//      </div>
//    </div>
//  );
//};

export default AuthSignIn;
