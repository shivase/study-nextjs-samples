import { Roboto, Roboto_Mono } from 'next/font/google';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={`${roboto.variable} ${roboto_mono.variable}`}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <div className="fixed bottom-4 left-4 z-50 h-8 w-8 rounded-full bg-blue-400">
          <Link href="/">
            <FaHome className=" m-2 text-white" />
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
};

export default Layout;
