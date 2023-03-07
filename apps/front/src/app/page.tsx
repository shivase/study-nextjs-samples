import Link from 'next/link';

const TopPage = () => {
  const buttonClass = 'rounded-xl border-4 border-solid border-lime-800 py-2 px-6';

  return (
    <div className="mt-16 flex flex-col items-center space-y-10">
      <div className="flex flex-col space-y-4">
        <div className="text-center">The Next.js 13 Bootcamp - The Complete Developer Guide</div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link href="/open-table">
            <button className={buttonClass}>Open Table</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div>
          <div className="text-center">
            Next.js Projects - 4 NextJS 13 projects (Instagram, Google.)
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link href="/imdb-clone">
            <button className={buttonClass}>IMDB Clone</button>
          </Link>
          <Link href="/google-clone">
            <button className={buttonClass}>Google Clone</button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-center">
          Nextjs, Firebase 9 & Tailwind CSS 3 project - Twitter clone
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link href="/twitter-clone">
            <button className={buttonClass}>Twitter Clone</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopPage;
