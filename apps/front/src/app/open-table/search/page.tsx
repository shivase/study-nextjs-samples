import { PRICE } from 'database';

import { prisma } from '@/app/open-table/lib/prisma';

import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import SearchSideBar from './components/SearchSideBar';

type SearchParams = {
  city?: string;
  cuisine?: string;
  price?: PRICE;
};

export const fetchRestaurantByCity = async (searchparams: SearchParams) => {
  const where: any = {};

  if (searchparams.city) {
    where.location = {
      name: {
        equals: searchparams.city.toLowerCase(),
      },
    };
  }

  if (searchparams.cuisine) {
    where.cuisine = {
      name: {
        equals: searchparams.cuisine.toLowerCase(),
      },
    };
  }

  if (searchparams.price) {
    where.price = {
      equals: searchparams.price,
    };
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };

  if (!searchparams) return await prisma.restaurant.findMany({ select: select });

  return await prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  return await prisma.location.findMany();
};

const fetchCuisines = async () => {
  return await prisma.cuisine.findMany();
};

export type SearchProps = {
  searchParams: SearchParams;
};

const Search = async (props: SearchProps) => {
  const restaurants = await fetchRestaurantByCity(props.searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="m-auto flex w-2/3 items-start justify-between py-4">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={props.searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <div>Sorry , we found no restaurants in this area</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
