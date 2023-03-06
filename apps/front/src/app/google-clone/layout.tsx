import Footer from './components/Footer';
import './globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
