'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';

const SignInButton = ({ provider }: { provider: ClientSafeProvider }) => {
  return (
    <button
      onClick={() => signIn(provider.id, { callbackUrl: '/twitter-clone' })}
      className="rounded-lg bg-red-400 p-3 text-white hover:bg-red-500">
      Sign in with {provider.name}
    </button>
  );
};

export default SignInButton;
