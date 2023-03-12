'use client';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AiOutlineCamera, AiOutlineSearch } from 'react-icons/ai';

const SearchHeaderOptions = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTerm = searchParams?.get('searchTerm') ?? '';
  const router = useRouter();

  const selectTab = (tab: string) => {
    router.push(
      `/google-clone/search/${tab === 'Images' ? 'image' : 'web'}?searchTerm=${searchTerm}`,
    );
  };

  return (
    <div className="flex w-full select-none justify-center space-x-2 border-b text-sm text-gray-700 lg:justify-start lg:pl-52">
      <button
        onClick={() => selectTab('All')}
        className={clsx(
          pathname === '/google-clone/search/web' && '!border-blue-600 !text-blue-600',
          'flex cursor-pointer items-center space-x-1 border-b-4 border-transparent px-2 pb-3 active:text-blue-500',
        )}>
        <AiOutlineSearch className="text-reg" />
        <p>All</p>
      </button>
      <button
        onClick={() => selectTab('Images')}
        className={clsx(
          pathname === '/google-clone/search/image' && '!border-blue-600 !text-blue-600',
          'flex cursor-pointer items-center space-x-1 border-b-4 border-transparent px-2 pb-3 active:text-blue-500',
        )}>
        <AiOutlineCamera className="text-reg" />
        <p>Images</p>
      </button>
    </div>
  );
};

export default SearchHeaderOptions;
