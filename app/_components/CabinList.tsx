import CabinCard from './CabinCard';
import { getCabins } from '../_lib/data-service';
import { Cabin } from '@/types/Cabin';

export default async function CabinList({ filter }: { filter: string }) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;

  switch (filter) {
    case 'all':
      displayedCabins = cabins;
      break;
    case 'small':
      displayedCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
      break;
    case 'medium':
      displayedCabins = cabins.filter(
        (cabin) => cabin.max_capacity >= 4 && cabin.max_capacity <= 7,
      );
      break;
    case 'large':
      displayedCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);
      break;

    default:
      displayedCabins = cabins;
      break;
  }

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayedCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </>
  );
}
