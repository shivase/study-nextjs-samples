import Image from 'next/image';
import {
  HiHashtag,
  HiHome,
  HiInbox,
  HiOutlineBell,
  HiOutlineBookmark,
  HiOutlineClipboard,
  HiOutlineDotsCircleHorizontal,
  HiOutlineDotsHorizontal,
  HiOutlineUser,
} from 'react-icons/hi';

import SidebarMenuItem from './SidebarMenuItem';

const Sidebar = () => {
  return (
    <div className="fixed hidden h-full flex-col p-2 sm:inline-flex lg:ml-24 lg:items-start">
      {/* Twitter Log */}
      <div className="hover-effect p-0 hover:bg-blue-100 lg:px-1">
        <Image
          alt="twitter logo"
          width={50}
          height={50}
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"></Image>
      </div>
      {/* Menu */}
      <div className="mt-4 mb-2.5 lg:items-start">
        <SidebarMenuItem text="Home" Icon={HiHome} active />
        <SidebarMenuItem text="Explorer" Icon={HiHashtag} />
        <SidebarMenuItem text="Notification" Icon={HiOutlineBell} />
        <SidebarMenuItem text="Messages" Icon={HiInbox} />
        <SidebarMenuItem text="Bookmark" Icon={HiOutlineBookmark} />
        <SidebarMenuItem text="Lists" Icon={HiOutlineClipboard} />
        <SidebarMenuItem text="Profile" Icon={HiOutlineUser} />
        <SidebarMenuItem text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>
      {/* Button */}
      <button className="hidden h-12 w-56 rounded-full bg-blue-400 text-lg font-bold text-white shadow-md hover:brightness-95 lg:inline ">
        Tweet
      </button>
      {/* Mini-Profile */}
      <div className="hover-effect mt-auto flex items-center justify-center text-gray-700 lg:justify-start">
        <img
          src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          alt="profile"
          className="h-10 w-10 rounded-full lg:mr-2"
        />
        <div className="hidden leading-5 lg:inline">
          <h4 className="font-bold">My Name</h4>
          <p className="text-gray-500">@myname</p>
        </div>
        <HiOutlineDotsHorizontal className="h-5 w-5 lg:ml-8" />
      </div>
    </div>
  );
};

export default Sidebar;
