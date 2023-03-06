import parser from 'html-react-parser';
import Link from 'next/link';

import PaginationButtons from './PaginationButtons';

const WebSearchResults = ({ results }: { results: any }) => {
  return (
    <div className="mx-auto w-full px-3 pb-40 sm:pl-[5%] md:pl-[14%] lg:pl-52">
      <p className="mb-5 mt-3 text-sm text-gray-600">
        About {results.searchInformation?.formattedTotalResults} results (
        {results.searchInformation?.formattedSearchTime} seconds)
      </p>
      {results.items?.map((result: any) => (
        <div className="mb-8 max-w-xl" key={result.link}>
          <div className="group flex flex-col">
            <Link className="truncate text-sm" href={result.link}>
              {result.formattedUrl}
            </Link>
            <Link
              className="truncate text-lg font-medium text-blue-800 decoration-blue-800 group-hover:underline"
              href={result.link}>
              {result.title}
            </Link>
          </div>
          <p className="text-gray-600">{parser(result.htmlSnippet)}</p>
        </div>
      ))}
      <PaginationButtons />
    </div>
  );
};

export default WebSearchResults;
