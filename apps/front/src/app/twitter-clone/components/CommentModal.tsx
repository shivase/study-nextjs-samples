'use client';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
// eslint-disable-next-line import/order
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { HiOutlineEmojiHappy, HiOutlinePhotograph, HiOutlineX } from 'react-icons/hi';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';

import { db } from '@/config/firebase';

import { modalState, postIdState } from '../atom/modalAtom';
import { useAuthentication } from '../hooks/useAuthentication';
import { useTweet } from '../hooks/useTweet';

Modal.setAppElement('#twitter-app');

const CommentModal = () => {
  const { currentUser } = useAuthentication();
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [post, setPost] = useState<DocumentData | null>(null);
  const { addComment } = useTweet();
  const router = useRouter();

  useEffect(() => {
    if (postId) {
      onSnapshot(doc(db, 'posts', postId), (snapshot) => setPost(snapshot));
    }
  }, [postId]);

  const sendCommentHandler = async () => {
    addComment(postId, input);
    setInput('');
    setSelectedFile(undefined);
    setOpen(false);
    router.push(`/twitter-clone/posts/${postId}`);
  };

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target?.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (readerEvent) => {
        const file = readerEvent.target?.result as string;
        setSelectedFile(file);
      };
    }
  };

  return (
    <div className="">
      {open && post && currentUser && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="absolute top-24 left-[50%] w-[90%] max-w-lg translate-x-[-50%] rounded-xl border-2 border-gray-400 bg-white shadow-md outline-none">
          <div className="p-1">
            <div className="border-b border-gray-200">
              <div className="hover-effect flex h-10 w-10 items-center justify-center">
                <HiOutlineX onClick={() => setOpen(false)} className="text-gray-700" />
              </div>
            </div>
            <div className="relative flex flex-col items-start space-x-1 space-y-4 p-2">
              <span className="absolute left-8 top-11 z-[-1] h-20 w-0.5 bg-gray-300" />
              <div className="flex">
                <img
                  className="mr-4 h-11 w-11 rounded-full"
                  src={post.data().userImg}
                  alt="user profile"
                />
                <div className="flex flex-col space-y-5">
                  <div className="flex">
                    <h4 className="text-[15px] font-bold hover:underline sm:text-[16px]">
                      {post.data().name}
                    </h4>
                    <span className="mr-2 text-sm sm:text-[15px]">@{post.data().username}</span>
                    <span className="text-sm hover:underline sm:text-[15px]">
                      {post.data().timestamp && (
                        <Moment fromNow>{post.data().timestamp.toDate()}</Moment>
                      )}
                    </span>
                  </div>
                  <div className="text-[15px] text-gray-500 sm:text-[16px]">{post.data().text}</div>
                </div>
              </div>
              <div className="flex w-full">
                <img
                  src={currentUser.userImg}
                  alt="profile"
                  className="h-11 w-11 cursor-pointer rounded-full hover:brightness-95"
                />
                <div className="flex w-full flex-col divide-y divide-gray-200">
                  <div className="divide-gray-200">
                    <textarea
                      value={input}
                      className="min-h-[50px] w-full border-none text-lg tracking-wide text-gray-700 outline-none placeholder:text-gray-300"
                      rows={2}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Tweet your reply"></textarea>
                  </div>
                  <div className="flex items-center justify-between pt-2.5">
                    <div className="flex">
                      <button className="" onClick={() => filePickerRef.current?.click()}>
                        <HiOutlinePhotograph className="hover-effect h-10 w-10 p-2 text-sky-500 hover:bg-sky-100" />
                        <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                      </button>
                      <HiOutlineEmojiHappy className="hover-effect h-10 w-10 p-2 text-sky-500 hover:bg-sky-100" />
                    </div>
                    <button
                      className="rounded-full bg-blue-400 px-4 py-1.5 font-bold text-white shadow-md hover:brightness-95 disabled:opacity-50"
                      onClick={sendCommentHandler}
                      disabled={!input.trim()}>
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
