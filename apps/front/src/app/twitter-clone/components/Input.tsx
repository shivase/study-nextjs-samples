import { HiOutlineEmojiHappy, HiOutlinePhotograph } from 'react-icons/hi';

const Input = () => {
  return (
    <div className="flex space-x-3 border-b border-gray-200 p-3">
      <img
        src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
        alt="profile"
        className="h-11 w-11 cursor-pointer rounded-full hover:brightness-95"
      />
      <div className="flex w-full flex-col divide-y divide-gray-200">
        <div className="divide-gray-200">
          <textarea
            className="min-h-[50px] w-full border-none text-lg tracking-wide text-gray-700 placeholder:text-gray-700 hover:ring-0"
            rows={2}
            placeholder="What's happening"></textarea>
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex">
            <HiOutlinePhotograph className="hover-effect h-10 w-10 p-2 text-sky-500 hover:bg-sky-100" />
            <HiOutlineEmojiHappy className="hover-effect h-10 w-10 p-2 text-sky-500 hover:bg-sky-100" />
          </div>
          <button
            className="rounded-full bg-blue-400 px-4 py-1.5 font-bold text-white shadow-md hover:brightness-95 disabled:opacity-50"
            disabled>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
