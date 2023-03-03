import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

import NavBar from './components/NavBar';
import AuthContext from './context/AuthContext';

import 'react-datepicker/dist/react-datepicker.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head></head>
      <body>
        <main className="min-h-screen w-screen bg-gray-100">
          <AuthContext>
            <main className="m-auto max-w-screen-2xl bg-white">
              <NavBar />
              {children}
            </main>
          </AuthContext>
        </main>
        <div className="fixed bottom-4 right-4 z-50 h-8 w-8 rounded-full bg-blue-400">
          <Link href="/">
            <FaHome className=" m-2 text-white" />
          </Link>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
