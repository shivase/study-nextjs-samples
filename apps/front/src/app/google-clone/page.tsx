import Image from 'next/image';

import Header from './components/Header';
import HomeSearch from './components/HomeSearch';

const Page = () => {
  return (
    <>
      <Header />

      <div className="mt-24 flex flex-col items-center justify-center">
        <Image
          priority={true}
          className=""
          alt="google image"
          width={300}
          height={100}
          style={{ width: 'auto', height: 'auto' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
        />
        <HomeSearch />
      </div>
    </>
  );
};

export default Page;
