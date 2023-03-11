import CommentModal from './components/CommentModal';
import Feed from './components/Feed';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import { News, User } from './types';

export const dynamic = 'force-dynamic';

const fetchNews = async (): Promise<News> => {
  const res = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json');

  if (!res.ok) {
    throw new Error('Something wrong happened.');
  }

  return await res.json();
};

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('https://randomuser.me/api/?results=30&inc=name,login,picture');

  if (!res.ok) {
    throw new Error('Something wrong happened.');
  }

  const data = await res.json();

  return data.results;
};

const TwitterClonePage = async () => {
  const news = await fetchNews();
  const users = await fetchUsers();

  return (
    <main id="twitter-app" className="mx-auto flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets news={news} users={users} />

      {/* Modal */}
      <CommentModal />
    </main>
  );
};

export default TwitterClonePage;
