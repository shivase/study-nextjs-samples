import { NavbarItem } from './NavbarItem';

export const Navbar = () => {
  return (
    <div className="flex justify-center bg-amber-100 p-4 dark:bg-gray-600 lg:text-lg">
      <NavbarItem title="Trending" param="fetchTrending" />
      <NavbarItem title="Top Rated" param="fetchTopRated" />
    </div>
  );
};
