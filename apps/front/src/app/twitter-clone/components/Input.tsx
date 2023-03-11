'use client';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useRef, useState } from 'react';
import { HiOutlineEmojiHappy, HiOutlinePhotograph, HiOutlineXCircle } from 'react-icons/hi';

import { useTweet } from '../hooks/useTweet';

const Input = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const { loading, sendTweet } = useTweet();

  const sendTweetHandler = async () => {
    sendTweet(input, selectedFile);

    setInput('');
    setSelectedFile(undefined);
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
    <>
      {session?.user?.image && (
        <div className="flex space-x-3 border-b border-gray-200 p-3">
          <img
            src={session.user.image}
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
                placeholder="What's happening"></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <HiOutlineXCircle
                  onClick={() => setSelectedFile(undefined)}
                  className="absolute right-2 top-2 h-7 w-7 cursor-pointer rounded-full text-white shadow-md"
                />
                <img
                  className={clsx(loading && 'animate-pulse', 'rounded-lg')}
                  src={selectedFile}
                  alt="selected file"
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <button className="" onClick={() => filePickerRef.current?.click()}>
                      <HiOutlinePhotograph className="hover-effect h-10 w-10 p-2 text-sky-500 hover:bg-sky-100" />
                      <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                    </button>
                    <HiOutlineEmojiHappy className="hover-effect h-10 w-10 p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    className="rounded-full bg-blue-400 px-4 py-1.5 font-bold text-white shadow-md hover:brightness-95 disabled:opacity-50"
                    onClick={sendTweetHandler}
                    disabled={!input.trim()}>
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
