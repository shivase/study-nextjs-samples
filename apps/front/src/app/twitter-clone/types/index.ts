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

export type User = {
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
};
