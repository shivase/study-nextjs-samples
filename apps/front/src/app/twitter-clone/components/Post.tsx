import clsx from 'clsx';
import { DocumentData, collection, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  HiDotsHorizontal,
  HiHeart,
  HiOutlineChartBar,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineTrash,
} from 'react-icons/hi';
import Moment from 'react-moment';

import { db } from '@/config/firebase';

import { useTweetPost } from '../hooks/useTweetPost';

const Post = ({ post }: { post: DocumentData }) => {
  const { data: session } = useSession();
  const tweet = post.data();
  const { likePost, unlikePost } = useTweetPost();
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, 'posts', post.id, 'likes'), (snapshot) => setLikes(snapshot.docs));
  }, []);

  useEffect(
    () => setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1),
    [likes, session],
  );

  return (
    <div className="flex cursor-pointer border-b border-gray-200 p-3">
      <img className="mr-4 h-11 w-11 rounded-full" src={tweet.userImg} alt="user profile" />
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="text-[15px] font-bold hover:underline sm:text-[16px]">{tweet.name}</h4>
            <span className="text-sm sm:text-[15px]">@{tweet.username} - </span>
            <span className="text-sm hover:underline sm:text-[15px]">
              {tweet.timestamp && <Moment fromNow>{tweet.timestamp.toDate()}</Moment>}
            </span>
          </div>
          <HiDotsHorizontal className="hover-effect h-10 w-10 p-2 hover:bg-sky-100 hover:text-sky-500" />
        </div>
        <p className="mb-2 text-[15px] text-gray-800 sm:text-[16px]">{tweet.text}</p>
        {tweet.image && <img className="ml-2 rounded-2xl" src={tweet.image} alt="post-img" />}
        <div className="flex justify-between p-2 text-gray-500">
          <HiOutlineChat className="hover-effect h-9 w-9 p-2 hover:bg-sky-100 hover:text-sky-500" />
          <HiOutlineTrash className="hover-effect h-9 w-9 p-2 hover:bg-red-100 hover:text-red-600" />
          <div className="flex items-center">
            {hasLiked ? (
              <HiHeart
                onClick={() => unlikePost(post.id)}
                className="hover-effect h-9 w-9 p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HiOutlineHeart
                onClick={() => likePost(post.id)}
                className="hover-effect h-9 w-9 p-2 hover:bg-red-100 hover:text-red-600"
              />
            )}
            {likes.length > 0 && (
              <span className={clsx(hasLiked && 'text-red-500', 'select-none text-sm')}>
                {likes.length}
              </span>
            )}
          </div>
          <HiOutlineShare className="hover-effect h-9 w-9 p-2 hover:bg-sky-100 hover:text-sky-500 " />
          <HiOutlineChartBar className="hover-effect h-9 w-9 p-2 hover:bg-sky-100 hover:text-sky-500" />
        </div>
      </div>
    </div>
  );
};

export default Post;
