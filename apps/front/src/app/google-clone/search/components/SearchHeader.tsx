import Image from 'next/image';
import Link from 'next/link';
import { RiSettingsLine } from 'react-icons/ri';
import { TbGridDots } from 'react-icons/tb';

import SearchBox from './SearchBox';
import SearchHeaderOptions from './SearchHeaderOptions';

const SearchHeader = () => {
  return (
    <header className="sticky top-0 bg-white">
      <div className="flex w-full items-center justify-between p-6">
        <Link href="/google-clone">
          <Image
            priority={true}
            width={120}
            height={40}
            alt="google image"
            style={{ width: 'auto', height: 'auto' }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"></Image>
        </Link>
        <div className="flex-1">
          <SearchBox />
        </div>
        <div className="hidden space-x-2 md:inline-flex ">
          <RiSettingsLine className="header-icon" />
          <TbGridDots className="header-icon" />
        </div>
        <button className="ml-2 rounded-md bg-blue-500 px-6 py-2 font-medium text-white transition-all hover:shadow-md hover:brightness-105">
          Sign in
        </button>
      </div>
      <SearchHeaderOptions />
    </header>
  );
};

export default SearchHeader;
