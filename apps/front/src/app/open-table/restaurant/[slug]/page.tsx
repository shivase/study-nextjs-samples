import { notFound } from 'next/navigation';

import { prisma } from '@/app/open-table/lib/prisma';
import { RestaurantInfo } from '@/app/open-table/types';

import Description from './components/Description';
import Images from './components/Images';
import Rating from './components/Rating';
import ReservationCard from './components/ReservationCard';
import RestaurantNavBar from './components/RestaurantNavBar';
import Reviews from './components/Reviews';
import Title from './components/Title';

const fetchRestaurantBySlug = async (slug: string): Promise<RestaurantInfo> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (restaurant === null) {
    notFound();
  }

  return restaurant;
};

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="w-[70%] rounded bg-white p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="relative w-[27%] text-reg">
        <ReservationCard
          open_time={restaurant.open_time}
          close_time={restaurant.close_time}
          slug={restaurant.slug}
        />
      </div>
    </>
  );
};

export default RestaurantDetails;
