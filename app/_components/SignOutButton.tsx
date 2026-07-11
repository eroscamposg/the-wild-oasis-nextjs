import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

import { authClient } from '../_lib/auth-client';

function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace('/');
          router.refresh();
        },
      },
    });
  }

  return (
    <button
      onClick={signOut}
      className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full cursor-pointer"
    >
      <ArrowRightEndOnRectangleIcon className="h-5 w-5 text-primary-600" />
      <span>Sign out</span>
    </button>
  );
}

export default SignOutButton;
