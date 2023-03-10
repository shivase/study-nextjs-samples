import { Article } from '../types';

const News = ({ article }: { article: Article }) => {
  return (
    <a href={article.url} target="_blank" className="" rel="noreferrer">
      <div className="flex items-center justify-between space-x-1 px-4 py-2 transition duration-500 ease-out hover:bg-gray-200">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold">{article.title}</h6>
          <p className="text-xsm font-medium text-gray-500">{article.source.name}</p>
        </div>
        <img className="rounded-xl" width="70" height="70" src={article.urlToImage} alt="article" />
      </div>
    </a>
  );
};

export default News;
