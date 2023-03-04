import Image from 'next/image';

import { TMDB_API_KEY } from '@/app/imdb-clone/config';
import type { Movie } from '@/app/imdb-clone/types';

export const dynamic = 'force-dynamic';

const getMovie = async (id: string): Promise<Movie> => {
  const request = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`;

  const res = await fetch(request);
  if (!res.ok) {
    throw new Error('Failed to fetch data: ' + res.statusText);
  }

  return await res.json();
};

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const movieId = params.id;
  const movie = await getMovie(movieId);

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-6xl flex-col content-center items-center p-4 md:flex-row md:space-x-6 md:pt-8">
        <Image
          src={`http://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}
          width={500}
          height={300}
          className="rounded-lg"
          placeholder="blur"
          blurDataURL="/spinner.svg"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          alt="Movie poster"></Image>
        <div className="p-2">
          <h2 className="mb-3 text-lg font-bold">{movie.title || movie.name}</h2>
          <p className="mb-3 text-lg">
            <span className="mr-1 font-semibold">Overview:</span>
            {movie.overview}
          </p>
          <p className="mb-3">
            <span className="mr-1 font-semibold ">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="mr-1 font-semibold ">Rating:</span>
            {movie.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
