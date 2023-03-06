import Link from 'next/link';

import { GOOGLE_SEARCH_API_KEY, GOOGLE_SEARCH_CONTEXT_KEY } from '../../config';
import WebSearchResults from '../components/WebSearchResults';

export const dynamic = 'force-dynamic';

type SearchWebPageProps = {
  searchParams?: {
    searchTerm?: string;
    start?: string;
  };
};

const fetchGoogleSearch = async (term: string, start: string) => {
  const request = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_CONTEXT_KEY}&q=${term}&start=${start}`;
  const res = await fetch(request);
  if (!res.ok) {
    throw new Error(`Something went wrong: ${res.statusText} (${res.status})`);
  }

  return await res.json();
};

const SearchWebPage = async (props: SearchWebPageProps) => {
  const searchTerm = props.searchParams?.searchTerm ?? '';
  const startIndex = props.searchParams?.start ?? '1';

  const results = await fetchGoogleSearch(searchTerm, startIndex);

  return (
    <>
      {results?.items.length > 0 ? (
        <WebSearchResults results={results} />
      ) : (
        <div className="flex flex-col items-center justify-center pt-10 ">
          <h1 className="mb-4 text-3xl">No results found</h1>
          <p className="text-lg">
            Try searching for something else or go back to the homepage{' '}
            <Link href="/google-clone" className="text-blue-500">
              HOME
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default SearchWebPage;
