import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cabins',
};

export default async function CabinPage() {
  return (
    <div>
      <h1>Cabins page</h1>
    </div>
  );
}
