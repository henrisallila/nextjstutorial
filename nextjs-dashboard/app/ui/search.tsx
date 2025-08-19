'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface SearchProps {
  placeholder?: string;
}

export default function Search({ placeholder = 'Search...' }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [term, setTerm] = useState(searchParams.get('query') || '');

const handleSearch = useDebouncedCallback((value: string) => {
  const params = new URLSearchParams(window.location.search); 
  if (value) {
    params.set('query', value);
    params.set('page', '1'); 
  } else {
    params.delete('query');
    params.set('page', '1'); 
  }
  replace(`${pathname}?${params.toString()}`);
}, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={term}
        onChange={(e) => {
          setTerm(e.target.value); // <-- päivitetään state
          handleSearch(e.target.value); // <-- debounce-funktio kutsutaan
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
