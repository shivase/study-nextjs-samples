'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export const SearchBox = () => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/imdb-clone/search/${search}`);
  };

  return (
    <form
      className="mx-auto flex max-w-6xl items-center justify-between px-4"
      onSubmit={(e) => submitHandler(e)}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-14 w-full flex-1 rounded-sm bg-transparent outline-none placeholder:text-gray-500"
        placeholder="Search keywords..."
      />
      <button disabled={!search} type="submit" className="text-amber-600 disabled:text-gray-400">
        Search
      </button>
    </form>
  );
};
