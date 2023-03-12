/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import clsx from 'clsx';
import { DocumentData, collection, onSnapshot } from 'firebase/firestore';
import { signIn } from 'next-auth/react';
// eslint-disable-next-line import/order
import { useRouter } from 'next/navigation';
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
import { useRecoilState } from 'recoil';

import { db } from '@/config/firebase';

import { modalState, postIdState } from '../atom/modalAtom';
import { useAuthentication } from '../hooks/useAuthentication';
import { useTweet } from '../hooks/useTweet';
import { TweetPost } from '../types';

const Post = ({ post, id }: { post: DocumentData; id: string }) => {
  const { currentUser } = useAuthentication();
  const tweet = post.data() as TweetPost;
  const { likePost, unlikePost, deleteTweet } = useTweet();
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [_, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  useEffect(() => {
    onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => setLikes(snapshot.docs));
    onSnapshot(collection(db, 'posts', id, 'comments'), (snapshot) => setComments(snapshot.docs));
  }, [id]);

  useEffect(
    () => setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1),
    [likes, currentUser],
  );

  return (
    <div className="flex cursor-pointer border-b border-gray-200 p-3">
      {tweet && (
        <>
          <img className="mr-4 h-11 w-11 rounded-full" src={tweet.userImg} alt="user profile" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <h4 className="text-[15px] font-bold hover:underline sm:text-[16px]">
                  {tweet.name}
                </h4>
                <span className="text-sm sm:text-[15px]">@{tweet.username} - </span>
                <span className="text-sm hover:underline sm:text-[15px]">
                  {tweet.timestamp && <Moment fromNow>{tweet.timestamp.toDate()}</Moment>}
                </span>
              </div>
              <HiDotsHorizontal className="hover-effect h-10 w-10 p-2 hover:bg-sky-100 hover:text-sky-500" />
            </div>
            <p
              onClick={() => router.push(`/twitter-clone/posts/${id}`)}
              className="mb-2 text-[15px] text-gray-800 sm:text-[16px]">
              {tweet.text}
            </p>

            {tweet.image && (
              <img
                onClick={() => router.push(`/twitter-clone/posts/${id}`)}
                className="ml-2 rounded-2xl"
                src={tweet.image}
                alt="post-img"
              />
            )}
            <div className="flex justify-between p-2 text-gray-500">
              <div className="flex items-center">
                <HiOutlineChat
                  onClick={() => {
                    if (!currentUser) {
                      signIn();
                    } else {
                      setPostId(id);
                      setOpen(!open);
                    }
                  }}
                  className="hover-effect h-9 w-9 p-2 hover:bg-sky-100 hover:text-sky-500"
                />
                {comments.length > 0 && <span className="">{comments.length}</span>}
              </div>
              {currentUser?.uid === tweet.id && (
                <HiOutlineTrash
                  onClick={() => {
                    deleteTweet(post);
                    router.push('/twitter-clone');
                  }}
                  className="hover-effect h-9 w-9 p-2 hover:bg-red-100 hover:text-red-600"
                />
              )}
              <div className="flex items-center">
                {hasLiked ? (
                  <HiHeart
                    onClick={() => unlikePost(id)}
                    className="hover-effect h-9 w-9 p-2 text-red-600 hover:bg-red-100"
                  />
                ) : (
                  <HiOutlineHeart
                    onClick={() => likePost(id)}
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
        </>
      )}
    </div>
  );
};

export default Post;
