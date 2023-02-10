import Menu from '../components/Menu';
import RestaurantNavBar from '../components/RestaurantNavBar';

const RestaurantMenu = () => {
  return (
    <div className="w-[100%] rounded bg-white p-3 shadow">
      <RestaurantNavBar />
      <Menu />
    </div>
  );
};

export default RestaurantMenu;
