import SearchHeader from './components/SearchHeader';

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SearchHeader />
      {children}
    </>
  );
};

export default SearchLayout;
