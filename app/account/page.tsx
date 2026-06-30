import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guest area',
};

export default function AccountPage() {
  return (
    <div className="font-semibold text-2xl text-accent-400 mb-7">Welcome to the Account Page</div>
  );
}
