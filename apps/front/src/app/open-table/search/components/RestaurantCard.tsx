import { Cuisine, PRICE, Location, Review } from 'database';
import Link from 'next/link';
import { FC } from 'react';

import Stars from '@/app/open-table/components/Stars';
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage';

import Price from '../../components/Price';

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
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews);

    if (rating > 4) return 'Awesome';
    else if (rating <= 4 && rating > 3) return 'Good';
    else if (rating <= 3 && rating > 0) return 'Average';
    else return '';
  };

  return (
    <div className="flex border-b pb-5">
      <img src={restaurant.main_image} alt="" className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="flex text-reg font-light">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/open-table/restaurant/${restaurant.slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
