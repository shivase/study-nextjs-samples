import Image from 'next/image';
import Link from 'next/link';
import { FiThumbsUp } from 'react-icons/fi';

export const Card = ({ result }: { result: any }) => {
  return (
    <div className="group cursor-pointer rounded-lg transition-shadow duration-200 sm:m-2 sm:border sm:border-slate-400 sm:p-3 sm:shadow-md sm:hover:shadow-slate-400">
      <Link href={`/imdb-clone/movie/${result.id}`}>
        <Image
          src={`http://image.tmdb.org/t/p/original/${result.backdrop_path || result.poster_path}`}
          width={500}
          height={300}
          className="transition-opacity duration-200 group-hover:opacity-80 sm:rounded-t-lg"
          placeholder="blur"
          blurDataURL="/spinner.svg"
          style={{ maxWidth: '100%', height: 'auto' }}
          alt="image is not available"></Image>
        <div className="p-2">
          <p className="text-reg line-clamp-2">{result.overview}</p>
          <h2 className="truncate text-lg font-bold">{result.title || result.name}</h2>
          <p className="flex items-center">
            {result.release_date || result.first_air_date}
            <FiThumbsUp className="mr-1 ml-3 h-5" /> {result.vote_count}
          </p>
        </div>
      </Link>
    </div>
  );
};
