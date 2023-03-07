import { HiOutlineSparkles } from 'react-icons/hi';

import Input from './Input';
import Post from './Post';

const Feed = () => {
  const posts = [
    {
      id: '1',
      name: 'Sahand Ghavidel',
      username: 'codewithsahand',
      userImg: 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png',
      img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
      text: 'nice view!',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      name: 'Sahand Ghavidel',
      username: 'codewithsahand',
      userImg: 'https://help.twitter.com/content/dam/help-twitter/brand/logo.png',
      img: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      text: 'wow!',
      timestamp: '2 days ago',
    },
  ];

  return (
    <div className="max-w-xl grow border-x sm:ml-[73px] lg:ml-[370px] lg:min-w-[576px]">
      <div className="sticky top-0 z-50 flex justify-between border-b border-gray-200 bg-white py-2 px-3">
        <h2 className="cursor-pointer text-lg font-bold sm:text-2xl">Home</h2>
        <div className="hover-effect ml-auto flex h-9 w-9 items-center justify-center px-0">
          <HiOutlineSparkles className="h-5 w-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
