'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  let activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);

    if (filter === 'all') params.delete('capacity');
    else params.set('capacity', filter);

    activeFilter = filter;

    const query = params.toString();
    const target = query ? `${pathname}?${query}` : pathname;

    router.replace(target, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button filter="all" handleFilter={() => handleFilter('all')} activefilter={activeFilter}>
        All cabins
      </Button>
      <Button filter="small" handleFilter={() => handleFilter('small')} activefilter={activeFilter}>
        1-3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={() => handleFilter('medium')}
        activefilter={activeFilter}
      >
        4-7 guests
      </Button>
      <Button filter="large" handleFilter={() => handleFilter('large')} activefilter={activeFilter}>
        8-10 guests
      </Button>
    </div>
  );
}

function Button({
  children,
  filter,
  handleFilter,
  activefilter,
}: {
  children: ReactNode;
  filter: string;
  handleFilter: Function;
  activefilter: string;
}) {
  return (
    <button
      className={`px-5 py-2 cursor-pointer hover:bg-primary-700 ${activefilter === filter ? 'bg-primary-700 text-primary-50' : ''}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
