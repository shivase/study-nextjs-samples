import Header from './components/Header';

const RestaurantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      <div className="m-auto -mt-11 flex w-2/3 items-start justify-between">{children}</div>
    </main>
  );
};

export default RestaurantLayout;
