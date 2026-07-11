import type { Metadata } from 'next';
import { auth } from '../_lib/auth';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Guest area',
};

export default async function AccountPage() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  const firstName = data?.user.name.split(' ').at(0);

  return <div className="font-semibold text-2xl text-accent-400 mb-7">Welcome, {firstName}</div>;
}
