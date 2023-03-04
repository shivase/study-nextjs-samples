import Link from 'next/link';
import { IconType } from 'react-icons';

export const MenuItem = ({
  title,
  address,
  Icon,
}: {
  title: string;
  address: string;
  Icon: IconType;
}) => {
  return (
    <div>
      <Link href={address} className="mx-4 flex hover:text-amber-600 lg:mx-6">
        <Icon className="mx-4 text-2xl sm:hidden" />
        <p className="my-2 hidden text-sm sm:inline">{title}</p>
      </Link>
    </div>
  );
};
