import SessionProviderWrapper from './components/SessionProviderWrapper';
import './globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SessionProviderWrapper>{children}</SessionProviderWrapper>
    </div>
  );
};

export default Layout;
