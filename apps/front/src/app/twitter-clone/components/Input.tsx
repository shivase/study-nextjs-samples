'use client';
import clsx from 'clsx';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useRef, useState } from 'react';
import { HiOutlineEmojiHappy, HiOutlinePhotograph, HiOutlineXCircle } from 'react-icons/hi';

import { db, storage } from '@/config/firebase';

const Input = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const sendTweet = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session?.user.uid,
      name: session?.user.name,
      username: session?.user.username,
      userImg: session?.user.image,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput('');
    setSelectedFile(null);
    setLoading(false);
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
                className="min-h-[50px] w-full border-none text-lg tracking-wide text-gray-700 placeholder:text-gray-700 hover:ring-0"
                rows={2}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What's happening"></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <HiOutlineXCircle
                  onClick={() => setSelectedFile(null)}
                  className="absolute right-2 top-2 h-7 w-7 cursor-pointer rounded-full text-white shadow-md shadow-white"
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
                    onClick={() => sendTweet()}
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
