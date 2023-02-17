import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';

import Form from './components/Form';
import Header from './components/Header';

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      main_image: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

const Reservation = async ({
  params,
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams: {
    date: string;
    partySize: string;
  };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <div className="h-screen border-t">
      <div className="m-auto w-3/5 py-9">
        {restaurant && (
          <Header
            restaurant={restaurant}
            date={searchParams.date}
            partySize={searchParams.partySize}
          />
        )}
        <Form slug={params.slug} date={searchParams.date} partySize={searchParams.partySize} />
      </div>
    </div>
  );
};

export default Reservation;
