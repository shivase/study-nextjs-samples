import { TMDB_API_KEY } from '@/app/imdb-clone/config';

import { Results } from '../../components/Results';
import type { Movie } from '../../types';

export const dynamic = 'force-dynamic';

const searchMovies = async (param: string): Promise<Movie[]> => {
  const request = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${param}&language=en-US&include_adult=false`;

  const res = await fetch(request);
  if (!res.ok) {
    throw new Error('Failed to fetch data: ' + res.statusText);
  }

  const data = await res.json();

  return data.results;
};

type SearchProps = {
  params: { slug: string };
};

const SearchPage = async (props: SearchProps) => {
  const movies = await searchMovies(props.params.slug);

  return (
    <div>
      {movies && movies.length === 0 && <h1 className="pt-6 text-center">No results found</h1>}
      {movies && movies.length > 0 && <Results results={movies} />}
    </div>
  );
};

export default SearchPage;
