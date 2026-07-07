import type { Metadata } from 'next';
import CabinList from '../_components/CabinList';
import { Suspense } from 'react';
import Spinner from '../_components/Spinner';
import Filter from '../_components/Filter';
import ReservationReminder from '../_components/ReservationReminder';

// Doesnt apply anymore because we are using (searchParams), which is used on runtime, making the page dynamic
// export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Cabins',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const filter = params?.capacity ?? 'all';

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">Our Luxury Cabins</h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian Dolomites. Imagine
        waking up to beautiful mountain views, spending your days exploring the dark forests around,
        or just relaxing in your private hot tub under the stars. Enjoy nature's beauty in your own
        little home away from home. The perfect spot for a peaceful, calm vacation. Welcome to
        paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* streaming with suspense... */}
      {/* key needed because of default behaviour of SUSPENSE with route changes. Navigation in NEXTJS is always wrapped in a React transition. In transitions, React doesnt hide the content that has already been rendered  earlier */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
