import Link from 'next/link';
import { FC } from 'react';

type RestaurantNavBarProps = {
  slug: string;
};

const RestaurantNavBar: FC<RestaurantNavBarProps> = ({ slug }) => {
  return (
    <nav className="flex border-b pb-2 text-reg">
      <Link href={`/restaurant/${slug}`} className="mr-7">
        Overview
      </Link>
      <Link href={`/restaurant/${slug}/menu`} className="mr-7">
        Menu
      </Link>
    </nav>
  );
};

export default RestaurantNavBar;
