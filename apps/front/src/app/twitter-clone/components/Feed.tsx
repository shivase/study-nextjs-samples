'use client';
import { HiOutlineSparkles } from 'react-icons/hi';

import { useTweetPost } from '../hooks/useTweetPost';

import Input from './Input';
import Post from './Post';

const Feed = () => {
  const { posts, loading } = useTweetPost();

  return (
    <div className="max-w-xl grow border-x sm:ml-[73px] lg:ml-[370px] lg:min-w-[576px]">
      <div className="sticky top-0 z-50 flex justify-between border-b border-gray-200 bg-white py-2 px-3">
        <h2 className="cursor-pointer text-lg font-bold sm:text-2xl">Home</h2>
        <div className="hover-effect ml-auto flex h-9 w-9 items-center justify-center px-0">
          <HiOutlineSparkles className="h-5 w-5" />
        </div>
      </div>
      <Input />
      {!loading && posts.map((post) => <Post key={post.data().id} post={post.data()} />)}
    </div>
  );
};

export default Feed;
