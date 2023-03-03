import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';
import { prisma } from './lib/prisma';

const fetchRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true,
    },
  });

  return restaurants;
};

const Home = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="mt-10 flex flex-wrap justify-center py-3 px-36">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
};

export default Home;
