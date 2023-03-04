'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const NavbarItem = ({ title, param }: { title: string; param: string }) => {
  const searchparams = useSearchParams();
  const genre = searchparams.get('genre');

  return (
    <div>
      <Link
        className={clsx(
          genre &&
            genre === param &&
            'rounded-lg underline decoration-amber-500 decoration-4 underline-offset-8',
          'm-4 p-2 font-semibold hover:text-amber-600',
        )}
        href={`/imdb-clone/?genre=${param}`}>
        {title}
      </Link>
    </div>
  );
};
