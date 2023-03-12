'use client';
import CommentModal from './components/CommentModal';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import { useNews } from './hooks/useNews';
import { useUsers } from './hooks/useUsers';

export const dynamic = 'force-dynamic';

const TwitterClonePage = () => {
  const { news } = useNews();
  const { users } = useUsers();

  return (
    <main id="twitter-app" className="mx-auto flex min-h-screen">
      <Sidebar />
      <div className="max-w-xl grow border-x sm:ml-[73px] lg:ml-[370px] lg:min-w-[576px]">
        <Feed />
      </div>
      {news && users && <Widgets news={news} users={users} />}
      <CommentModal />
    </main>
  );
};

export default TwitterClonePage;
