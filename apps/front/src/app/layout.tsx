import './globals.css';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <div className="absolute bottom-4 right-4 z-50 h-8 w-8 rounded-full bg-blue-400">
          <Link href="/">
            <FaHome className=" m-2 text-white" />
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
