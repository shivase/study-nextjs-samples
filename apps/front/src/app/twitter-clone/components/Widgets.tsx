'use client';
import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

import type { News as NewsType } from '../types';

import News from './News';

const Widgets = ({ news }: { news: NewsType }) => {
  const [articleNum, setArticleNum] = useState(3);

  return (
    <div className="ml-8 hidden space-y-5 lg:inline lg:w-[600px]">
      <div className="sticky top-0 z-50 w-[90%] bg-white py-1.5 lg:w-[75%]">
        <div className="relative flex items-center rounded-full bg-red-100 p-3">
          <HiOutlineSearch className="z-50 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="absolute inset-0 rounded-full border-gray-500 bg-gray-100 pl-11 text-gray-700 focus:bg-white focus:shadow-lg"
          />
        </div>
      </div>
      <div className="w-[90%] space-y-3 rounded-xl bg-gray-100 pt-2 text-gray-700 lg:w-[75%]">
        <h4 className="px-4 text-lg font-bold">What's happening</h4>
        {news.articles.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="pl-4 pb-3 text-blue-300 hover:text-blue-400">
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;