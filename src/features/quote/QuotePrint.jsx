import React from 'react';
import { useDeleteQuoteMutation } from './quoteapi';
import { MdDelete, MdEdit, MdContentCopy } from "react-icons/md";

const QuotePrint = ({ quotes, setSelectedQuote }) => {
  const [deleteQuote] = useDeleteQuoteMutation();

  const handleCopyToClipboard = async (quote, author) => {
    try {
      await navigator.clipboard.writeText(`"${quote}" - ${author}`);
      alert('Quote copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy quote.');
    }
  };

  if (!quotes) {
    return <p className="text-white text-center">No quotes to display.</p>;
  }

  return (
    <div className="bg-slate-800 text-white flex flex-col items-center p-4 gap-4">
      {quotes.map((qt) => (
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
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
              onClick={() => handleCopyToClipboard(qt.quote, qt.author)}
            >
              <MdContentCopy />
            </button>
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
    </div>
  );
};

export default QuotePrint