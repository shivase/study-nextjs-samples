import { Item } from 'database';

import { prisma } from '@/app/open-table/lib/prisma';

import Menu from '../components/Menu';
import RestaurantNavBar from '../components/RestaurantNavBar';

export const dynamic = 'force-dynamic';

const fetchItems = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (restaurant === null) {
    throw Error();
  }

  return restaurant.items;
};

const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
  const items = await fetchItems(params.slug);

  return (
    <div className="w-[100%] rounded bg-white p-3 shadow">
      <RestaurantNavBar slug={params.slug} />
      <Menu menu={items} />
    </div>
  );
};

export default RestaurantMenu;
