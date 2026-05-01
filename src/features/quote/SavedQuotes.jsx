import React from 'react';
import { useGetQuotesQuery, useDeleteQuoteMutation } from './quoteapi';
import { useSelector } from 'react-redux';
import { MdDelete, MdContentCopy } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const SavedQuotes = () => {
  const userId = useSelector((state) => state.auth.userId);
  const { data: quotes, isLoading, error } = useGetQuotesQuery(userId);
  const [deleteQuote] = useDeleteQuoteMutation();
  const navigate = useNavigate()
  const handleCopy = async (q) => {
    await navigator.clipboard.writeText(`"${q.quote}" - ${q.author}`);
    alert("Copied!");
  };

  if (isLoading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error loading quotes</p>;

  return (
    <div className='bg-slate-900 flex flex-col justify-start items-start min-h-screen text-white'>
        <h1 className='text-white' onClick={()=>navigate("/quotes")}>Back to Dashboard</h1>
    <div className=" flex flex-col items-center p-4 gap-4">
      {quotes?.length > 0 ? (
        quotes.map((qt) => (
          <div
            key={qt.id}
            className="flex items-center justify-between bg-slate-800 p-3 rounded w-full max-w-md"
          >
            <div>
              <h2>"{qt.quote}"</h2>
              <p className="text-sm text-gray-400">- {qt.author}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleCopy(qt)}>
                <MdContentCopy />
              </button>
              <button onClick={() => deleteQuote(qt.id)}>
                <MdDelete />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No saved quotes</p>
      )}
    </div>
      </div>
  );
};

export default SavedQuotes;