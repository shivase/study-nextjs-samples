import type { Cuisine, Location, PRICE, Review } from 'database';
import Link from 'next/link';
import { FC } from 'react';

import Price from './Price';
import Stars from './Stars';

type RestaurantCardType = {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  slug: string;
  location: Location;
  price: PRICE;
  reviews: Review[];
};

type RestaurantCardProps = {
  restaurant: RestaurantCardType;
};

const RestaurantCard: FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <div className="m-3 h-72 w-64 cursor-pointer overflow-hidden rounded border">
      <Link href={`/restaurant/${restaurant.slug}`}>
        <img src={restaurant.main_image} alt="" className="h-36 w-full" />
        <div className="p-1">
          <h3 className="mb-2 text-2xl font-bold">{restaurant.name}</h3>
          <div className="flex items-start">
            <Stars reviews={restaurant.reviews} />
            <p className="ml-2">{restaurant.reviews.length} reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="mt-1 text-sm font-bold">Booked 3 times today</p>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
