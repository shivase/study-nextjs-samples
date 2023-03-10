/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
// eslint-disable-next-line import/order
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
  const { data: session } = useSession();

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
        {session && (
          <>
            <SidebarMenuItem text="Notification" Icon={HiOutlineBell} />
            <SidebarMenuItem text="Messages" Icon={HiInbox} />
            <SidebarMenuItem text="Bookmark" Icon={HiOutlineBookmark} />
            <SidebarMenuItem text="Lists" Icon={HiOutlineClipboard} />
            <SidebarMenuItem text="Profile" Icon={HiOutlineUser} />
            <SidebarMenuItem text="More" Icon={HiOutlineDotsCircleHorizontal} />
          </>
        )}
      </div>
      {session?.user?.image ? (
        <>
          {/* Button */}
          <button className="hidden h-12 w-56 rounded-full bg-blue-400 text-lg font-bold text-white shadow-md hover:brightness-95 lg:inline ">
            Tweet
          </button>
          {/* Mini-Profile */}
          <div className="hover-effect mt-auto flex items-center justify-center text-gray-700 lg:justify-start">
            <img
              onClick={() => signOut()}
              src={session.user.image}
              alt="profile"
              className="h-10 w-10 rounded-full lg:mr-2"
            />
            <div className="hidden leading-5 lg:inline">
              <h4 className="font-bold">{session.user.username}</h4>
              <p className="text-gray-500">@{session.user.uid}</p>
            </div>
            <HiOutlineDotsHorizontal className="h-5 w-5 lg:ml-8" />
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => signIn()}
            className="hidden h-12 w-56 rounded-full bg-blue-400 text-lg font-bold text-white shadow-md hover:brightness-95 lg:inline ">
            Sign In
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;
