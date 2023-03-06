const Loading = () => {
  return (
    <>
      <div className="mx-2 flex max-w-6xl flex-col pb-44 pt-10 sm:flex-row sm:space-x-4 lg:pl-52">
        <div className="animate-pulse">
          <div className="mb-4 h-48 w-48 rounded-md bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-48 rounded-md bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-44 rounded-md bg-gray-200"></div>
        </div>
        <div className="animate-pulse">
          <div className="mb-4 h-48 w-48 rounded-md bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-48 rounded-md bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-44 rounded-md bg-gray-200"></div>
        </div>
        <div className="animate-pulse">
          <div className="mb-4 h-48 w-48 rounded-md bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-48 rounded-md bg-gray-200"></div>
          <div className="mb-2.5 h-2 w-44 rounded-md bg-gray-200"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
