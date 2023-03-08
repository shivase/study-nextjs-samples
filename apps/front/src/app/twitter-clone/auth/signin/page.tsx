import { getProviders } from 'next-auth/react';

import SignInButton from './components/SignInButton';

const getProvider = async () => {
  return await getProviders();
};

const AuthSignIn = async () => {
  const providers = await getProvider();

  return (
    <div className="mt-20 flex justify-center space-x-4">
      <img
        src="https://icons-for-free.com/iconfiles/png/512/iphone+phone+twitter+logo+icon-1320195967629219142.png"
        alt="twitter inside a phone"
        className="hidden rotate-6 object-cover md:inline-flex md:h-80 md:w-44"
      />
      <div className="">
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.id} className="flex flex-col items-center">
              <img
                src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
                alt="twitter logo"
                className="w-36 object-cover"
              />
              <p className="my-10 text-center text-sm italic">
                This app is created for learning purpose
              </p>
              <SignInButton provider={provider} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AuthSignIn;
