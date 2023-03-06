'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillMicFill } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

const SearchBox = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm') ?? '';
  const [input, setInput] = useState(searchTerm);
  const router = useRouter();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/google-clone/search/web?searchTerm=${input}`);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="ml-10 mr-5 flex max-w-3xl grow items-center rounded-full border border-gray-200 px-6 py-3 shadow-lg">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="w-full focus:outline-none"
      />

      <RxCross2
        onClick={() => setInput('')}
        className="cursor-pointer text-2xl text-gray-500 sm:mr-2"
      />
      <BsFillMicFill className="mr-3 hidden border-l-2 border-gray-300 pl-4 text-4xl text-blue-500 sm:inline-flex" />
      <AiOutlineSearch
        onClick={submitHandler}
        className="hidden cursor-pointer text-2xl text-blue-500 sm:inline-flex"
      />
    </form>
  );
};

export default SearchBox;
