import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// fetch calls get cached for the page
export async function generateMetadata({ params }: PageProps<'/cabins/[cabinId]'>) {
  const { cabinId } = await params;
  const cabin = await getCabin(Number(cabinId));
  if (!cabin) notFound();

  const { name } = cabin;

  return {
    title: `Cabin ${name}`,
  };
}

// Good to use if you have a finite amount of params received, to convert the page into a static page and use static site generation
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

// Special type to auto generate types of params
export default async function Page({ params }: PageProps<'/cabins/[cabinId]'>) {
  const { cabinId } = await params;
  const cabin = await getCabin(Number(cabinId));

  if (!cabin) notFound();

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div>
        <Cabin cabin={cabin} />

        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
