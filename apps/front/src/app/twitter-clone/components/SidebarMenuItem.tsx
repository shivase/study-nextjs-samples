import clsx from 'clsx';
import { IconType } from 'react-icons';

const SidebarMenuItem = ({
  text,
  Icon,
  active,
}: {
  text: string;
  Icon: IconType;
  active?: boolean;
}) => {
  return (
    <div className="hover-effect flex items-center justify-center space-x-3 text-lg text-gray-700 lg:justify-start">
      <Icon className="h-7 w-7" />
      <span className={clsx(active && 'font-bold', 'hidden lg:inline-flex')}>{text}</span>
    </div>
  );
};

export default SidebarMenuItem;
