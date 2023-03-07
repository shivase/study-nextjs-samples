import Feed from './components/Feed';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import { News } from './types';

export const dynamic = 'force-dynamic';

const fetchNews = async (): Promise<News> => {
  const res = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json');

  if (!res.ok) {
    throw new Error('Something wrong happened.');
  }

  return await res.json();
};

const TwitterClonePage = async () => {
  const news = await fetchNews();

  return (
    <main className="mx-auto flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets news={news} />

      {/* Modal */}
      <Modal />
    </main>
  );
};

export default TwitterClonePage;
