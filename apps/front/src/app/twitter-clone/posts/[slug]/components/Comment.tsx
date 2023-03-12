import clsx from 'clsx';
import { DocumentData, collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { signIn, useSession } from 'next-auth/react';
// eslint-disable-next-line import/order
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  HiDotsHorizontal,
  HiHeart,
  HiOutlineChartBar,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineTrash,
} from 'react-icons/hi';
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';

import { modalState, postIdState } from '@/app/twitter-clone/atom/modalAtom';
import { db } from '@/config/firebase';

import { Comment } from '../../../types';

const CommentPage = ({
  commentId,
  originalPostId,
  comment,
}: {
  commentId: string;
  originalPostId: string;
  comment: Comment;
}) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [_, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  useEffect(() => {
    onSnapshot(
      collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'),
      (snapshot) => setLikes(snapshot.docs),
    );
  }, [originalPostId, commentId]);

  useEffect(
    () => setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1),
    [likes, session],
  );

  const likeComment = async () => {
    if (session?.user.uid) {
      if (hasLiked) {
        await deleteDoc(
          doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session.user.uid),
        );
      } else {
        await setDoc(
          doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session.user.uid),
          {
            username: session.user.username,
          },
        );
      }
    } else {
      signIn();
    }
  };

  const deleteComment = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId));
    }
  };

  return (
    <div className="flex cursor-pointer border-b border-gray-200 p-3 pl-20">
      {comment && (
        <>
          <img className="mr-4 h-11 w-11 rounded-full" src={comment.userImg} alt="user profile" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <h4 className="text-[15px] font-bold hover:underline sm:text-[16px]">
                  {comment.name}
                </h4>
                <span className="text-sm sm:text-[15px]">@{comment.username} - </span>
                <span className="text-sm hover:underline sm:text-[15px]">
                  {comment.timestamp && <Moment fromNow>{comment.timestamp.toDate()}</Moment>}
                </span>
              </div>
              <HiDotsHorizontal className="hover-effect h-10 w-10 p-2 hover:bg-sky-100 hover:text-sky-500" />
            </div>
            <p className="mb-2 text-[15px] text-gray-800 sm:text-[16px]">{comment.comment}</p>
            <div className="flex justify-between p-2 text-gray-500">
              {session?.user.uid === comment.id && (
                <HiOutlineTrash
                  onClick={deleteComment}
                  className="hover-effect h-9 w-9 p-2 hover:bg-red-100 hover:text-red-600"
                />
              )}
              <div className="flex items-center">
                {hasLiked ? (
                  <HiHeart
                    onClick={likeComment}
                    className="hover-effect h-9 w-9 p-2 text-red-600 hover:bg-red-100"
                  />
                ) : (
                  <HiOutlineHeart
                    onClick={likeComment}
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

export default CommentPage;
