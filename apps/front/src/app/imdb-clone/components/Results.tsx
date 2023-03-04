import type { Movie } from '@/app/imdb-clone/types';

import { Card } from './Card';

export const Results = ({ results }: { results: Movie[] }) => {
  return (
    <div className="mx-auto max-w-6xl p-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {results.map((result: any) => (
        <Card key={result.id} result={result} />
      ))}
    </div>
  );
};
