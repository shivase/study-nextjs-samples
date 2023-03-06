'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, MouseEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';

const HomeSearch = () => {
  const [input, setInput] = useState('');
  const router = useRouter();
  const [randomSearchLoading, setRandomSearchLoading] = useState(false);

  const submitHandler = (e: FormEvent | MouseEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/google-clone/search/web?searchTerm=${input}`);
  };

  const randomSearchHandler = async () => {
    setRandomSearchLoading(true);
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    if (!response.ok) return;

    const data = await response.json();
    router.push(`/google-clone/search/web?searchTerm=${data[0]}`);
    setRandomSearchLoading(false);
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="mx-auto mt-5 flex w-full max-w-[90%] items-center rounded-full border border-gray-200 px-5 py-3 transition-shadow focus-within:shadow-md hover:shadow-md sm:max-w-lg lg:max-w-2xl">
        <AiOutlineSearch className="mr-3 text-lg text-gray-500" />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="grow focus:outline-none"
        />
        <BsFillMicFill className="text-lg" />
      </form>
      <div className="mt-8 flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button onClick={submitHandler} className="btn capitalize">
          Google Search
        </button>
        <button
          onClick={randomSearchHandler}
          disabled={randomSearchLoading}
          className="btn flex items-center justify-center capitalize disabled:opacity-80">
          {randomSearchLoading ? (
            <img src="/spinner.svg" alt="loading..." className="h-6 text-center" />
          ) : (
            'I am feeling lucky'
          )}
        </button>
      </div>
    </>
  );
};

export default HomeSearch;
