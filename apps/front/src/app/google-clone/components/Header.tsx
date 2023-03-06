import Link from 'next/link';
import { TbGridDots } from 'react-icons/tb';

const Header = () => {
  return (
    <header className="flex justify-between p-5 text-sm">
      <div className="font-serif text-2xl">Dummy Sites</div>
      <div className="flex items-center space-x-4">
        <Link className="hover:underline" href="https://mail.google.com">
          Gmail
        </Link>
        <Link className="hover:underline" href="https://image.google.com">
          Images
        </Link>
        <TbGridDots className="rounded-full bg-transparent p-2 text-4xl hover:bg-gray-200" />
        <button className="rounded-md bg-blue-500 px-6 py-2 font-medium text-white transition-shadow hover:shadow-md hover:brightness-105">
          Sign in
        </button>
      </div>
    </header>
  );
};

export default Header;
