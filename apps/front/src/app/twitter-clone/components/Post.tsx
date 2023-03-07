import {
  HiDotsHorizontal,
  HiOutlineChartBar,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineTrash,
} from 'react-icons/hi';

import type { TweetPost } from '../types';

const Post = ({ post }: { post: TweetPost }) => {
  return (
    <div className="flex cursor-pointer border-b border-gray-200 p-3">
      <img className="mr-4 h-11 w-11 rounded-full" src={post.userImg} alt="user profile" />
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="text-[15px] font-bold hover:underline sm:text-[16px]">{post.name}</h4>
            <span className="text-sm sm:text-[15px]">@{post.username} - </span>
            <span className="text-sm hover:underline sm:text-[15px]">{post.timestamp}</span>
          </div>
          <HiDotsHorizontal className="hover-effect h-10 w-10 p-2 hover:bg-sky-100 hover:text-sky-500" />
        </div>
        <p className="mb-2 text-[15px] text-gray-800 sm:text-[16px]">{post.text}</p>
        <img className="ml-2 rounded-2xl" src={post.img} alt="post-img" />
        <div className="flex justify-between p-2 text-gray-500">
          <HiOutlineChat className="hover-effect h-9 w-9 p-2 hover:bg-sky-100 hover:text-sky-500" />
          <HiOutlineTrash className="hover-effect h-9 w-9 p-2 hover:bg-red-100 hover:text-red-600" />
          <HiOutlineHeart className="hover-effect h-9 w-9 p-2 hover:bg-red-100 hover:text-red-600" />
          <HiOutlineShare className="hover-effect h-9 w-9 p-2 hover:bg-sky-100 hover:text-sky-500 " />
          <HiOutlineChartBar className="hover-effect h-9 w-9 p-2 hover:bg-sky-100 hover:text-sky-500" />
        </div>
      </div>
    </div>
  );
};

export default Post;
