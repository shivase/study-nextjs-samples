'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineSparkles } from 'react-icons/hi';

import { useTweet } from '../hooks/useTweet';

import Input from './Input';
import Post from './Post';

const Feed = () => {
  const { posts } = useTweet();

  return (
    <>
      <div className="sticky top-0 z-50 flex justify-between border-b border-gray-200 bg-white py-2 px-3">
        <h2 className="cursor-pointer text-lg font-bold sm:text-2xl">Home</h2>
        <div className="hover-effect ml-auto flex h-9 w-9 items-center justify-center px-0">
          <HiOutlineSparkles className="h-5 w-5" />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            <Post key={post.id} id={post.id} post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default Feed;
