import { Results } from './components/Results';
import { TMDB_API_KEY } from './config';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: {
    genre?: string;
  };
};

const IndexPage = async (props: PageProps) => {
  const genre = props.searchParams?.genre ?? 'fetchTrending;';

  const request = `https://api.themoviedb.org/3/${
    genre === 'fetchTopRated' ? 'movie/top_rated' : 'trending/all/week'
  }?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

  const res = await fetch(request, { next: { revalidate: 10 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data: ' + res.statusText);
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div className="">
      <Results results={results} />
    </div>
  );
};

export default IndexPage;
