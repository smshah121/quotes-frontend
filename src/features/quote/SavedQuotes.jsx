import React from 'react';
import { useGetQuotesQuery, useDeleteQuoteMutation } from './quoteapi';
import { useSelector } from 'react-redux';
import { MdDelete, MdContentCopy } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const SavedQuotes = () => {
  const userId = useSelector((state) => state.auth.userId);
  const { data: quotes, isLoading, error } = useGetQuotesQuery(userId);
  const [deleteQuote] = useDeleteQuoteMutation();
  const navigate = useNavigate();

  const handleCopy = async (q) => {
    try {
      await navigator.clipboard.writeText(`"${q.quote}" - ${q.author}`);
      alert("✅ Copied to clipboard!");
    } catch (err) {
      alert("❌ Failed to copy");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center text-white">
        Loading saved quotes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center text-red-400">
        Error loading quotes
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-white">

      {/* 🔥 Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(`/quotes/`)}
          className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold">📌 Saved Quotes</h1>

        {/* Spacer */}
        <div></div>
      </div>

      {/* 🔥 Content */}
      <div className="flex flex-col items-center p-6 gap-4">

        {quotes?.length > 0 ? (
          quotes.map((qt) => (
            <div
              key={qt.id}
              className="w-full max-w-xl bg-slate-800 border border-white/10 rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              {/* Quote Text */}
              <h2 className="text-base font-medium leading-relaxed">
                “{qt.quote}”
              </h2>

              {/* Author */}
              <p className="text-sm text-slate-400 mt-1">
                — {qt.author}
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-4">

                <button
                  onClick={() => handleCopy(qt)}
                  className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition"
                  title="Copy"
                >
                  <MdContentCopy size={18} />
                </button>

                <button
                  onClick={() => deleteQuote(qt.id)}
                  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition"
                  title="Delete"
                >
                  <MdDelete size={18} />
                </button>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-lg text-slate-400">No saved quotes yet</h2>
            <p className="text-sm text-slate-500 mt-2">
              Start adding quotes and they’ll appear here
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SavedQuotes;