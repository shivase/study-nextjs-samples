import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';

import { DarkModeSwitch } from './DarkModeSwitch';
import { MenuItem } from './MenuItem';

export const Header = () => {
  return (
    <div className="mx-2 flex max-w-6xl items-center justify-between py-6 sm:mx-auto">
      <div className="flex">
        <MenuItem title="HOME" address="/imdb-clone" Icon={AiFillHome} />
        <MenuItem title="ABOUT" address="/imdb-clone/about" Icon={BsFillInfoCircleFill} />
      </div>
      <div className="flex items-center gap-x-5">
        <DarkModeSwitch />
        <Link href="/imdb-clone">
          <h2 className="text-2xl">
            <span className="mr-1 rounded-lg bg-amber-500 py-1 px-2 font-bold">IMDb</span>
            <span className="hidden text-lg sm:inline">Clone</span>
          </h2>
        </Link>
      </div>
    </div>
  );
};
