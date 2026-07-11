'use client';

import { authClient } from '../_lib/auth-client';

function SignInButton() {
  async function handleSignIn() {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/account',
    });
  }

  return (
    <button
      type="submit"
      onClick={handleSignIn}
      className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium cursor-pointer"
    >
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
      <span>Continue with Google</span>
    </button>
  );
}

export default SignInButton;
