import AuthContext from '../context/AuthContext';

import NavBar from './components/NavBar';
import './globals.css';
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
      </body>
    </html>
  );
};

export default RootLayout;
