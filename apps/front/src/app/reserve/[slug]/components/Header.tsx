import { Restaurant } from 'database';
import { format } from 'date-fns';
import { FC } from 'react';

import { Time, convertToDisplayTime } from '@/app/utils/convertToDisplayTime';

type HeaderProps = {
  date: string;
  partySize: string;
  restaurant: Pick<Restaurant, 'name' | 'main_image'>;
};

const Header: FC<HeaderProps> = ({ restaurant, date, partySize }) => {
  const [_, time] = date.split('T');

  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={restaurant.main_image} alt="" className="h-16 w-32 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <div className="mt-3 flex">
            <p className="mr-6">{format(new Date(date), 'ccc, LLL d')}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">{partySize} people</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
