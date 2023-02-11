import Header from './components/Header';

const RestaurantLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <main>
      <Header title={params.slug} />
      <div className="m-auto -mt-11 flex w-2/3 items-start justify-between">{children}</div>
    </main>
  );
};

export default RestaurantLayout;
