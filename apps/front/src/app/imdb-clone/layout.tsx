import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { SearchBox } from './components/SearchBox';
import { ProviderPage } from './Provider';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ProviderPage>
        <Header />
        <Navbar />
        <SearchBox />
        {children}
      </ProviderPage>
    </div>
  );
};

export default LayoutPage;
