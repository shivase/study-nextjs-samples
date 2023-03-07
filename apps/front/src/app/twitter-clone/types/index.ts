export type TweetPost = {
  id: string;
  name: string;
  username: string;
  userImg: string;
  img: string;
  text: string;
  timestamp: string;
};

export type News = {
  status: string;
  totalResults: number;
  articles: Article[];
};

export type Article = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};
