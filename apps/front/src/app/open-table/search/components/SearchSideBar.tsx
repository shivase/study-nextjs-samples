import { Location, Cuisine, PRICE } from 'database';
import Link from 'next/link';
import { FC } from 'react';

type SearchBarProps = {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: {
    city?: string;
    cuisine?: string;
    price?: PRICE;
  };
};

const SearchSideBar: FC<SearchBarProps> = (props) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      tag: '$',
      className: 'w-full rounded-l border p-2 text-reg font-light text-center',
    },
    {
      price: PRICE.REGULAR,
      className: 'w-full rounded-l border p-2 text-reg font-light text-center',
      tag: '$$',
    },
    {
      price: PRICE.EXPENSIVE,
      className: 'w-full rounded-l border p-2 text-reg font-light text-center',
      tag: '$$$',
    },
  ];

  return (
    <div className="w-1/5">
      <div className="flex flex-col border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {props.locations.map((loc) => (
          <Link
            href={{
              pathname: '/open-table/search',
              query: {
                ...props.searchParams,
                city: loc.name,
              },
            }}
            key={loc.id}
            className="text-reg font-light capitalize">
            {loc.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 flex flex-col border-b pb-4">
        <h1 className="mb-2">Cuisine</h1>
        {props.cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: '/open-table/search',
              query: {
                ...props.searchParams,
                cuisine: cuisine.name,
              },
            }}
            key={cuisine.id}
            className="text-reg font-light capitalize">
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map((price) => (
            <Link
              key={price.price}
              href={{
                pathname: '/open-table/search',
                query: {
                  ...props.searchParams,
                  price: PRICE.REGULAR,
                },
              }}
              className={price.className}>
              {price.tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
