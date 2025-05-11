import React from 'react';
import { useDeleteQuoteMutation, useGetQuotesQuery } from './quoteapi';
import { MdDelete, MdEdit } from "react-icons/md";

const QuotePrint = ({ setSelectedQuote }) => {
  const { data, error, isLoading, isFetching } = useGetQuotesQuery();
  const [deleteQuote] = useDeleteQuoteMutation();

  if (isLoading) return <p className="text-white text-center">Loading posts...</p>;
  if (error) return <p className="text-red-500 text-center">Error fetching posts!</p>;

  return (
    <div className="bg-slate-800 text-white flex flex-col items-center p-4 gap-4 ]">
      {data?.map((qt) => (
        <div 
          key={qt.id} 
          className="flex items-center justify-between bg-slate-900 p-3 rounded w-full max-w-md shadow-md"
        >
          <div>
            <h2 className="text-base font-medium">"{qt.quote}"</h2>
            <h6 className="text-xs text-gray-300">- {qt.author}</h6>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
              onClick={() => setSelectedQuote(qt)}
            >
              <MdEdit />
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
              onClick={() => deleteQuote(qt.id)}
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
      {isFetching && <p className="text-center">Updating...</p>}
    </div>
  );
};

export default QuotePrint;
