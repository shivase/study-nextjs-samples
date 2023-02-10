import Header from '@/app/components/Header';
import RestaurantCard from '@/app/components/RestaurantCard';

const Home = () => {
  return (
    <main>
      <Header />
      <div className="mt-10 flex flex-wrap justify-center py-3 px-36">
        <RestaurantCard />
      </div>
    </main>
  );
};

export default Home;
