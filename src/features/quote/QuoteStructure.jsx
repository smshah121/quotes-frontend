import React, { useEffect, useState } from 'react';
import { useAddQuoteMutation, useUpdateQuoteMutation, useGetQuotesQuery, useDeleteQuoteMutation } from './quoteapi'; // Import the RTK Query hooks
import { useSelector } from 'react-redux';
import LogoutButton from '../../login/Logoutbutton';


const QuoteStruct = ({ selectedQuote, setSelectedQuote }) => {
  const [author, setAuthor] = useState('');
  const [quote, setQuote] = useState('');
  const userId = useSelector((state) => state.auth.userId);
  const [addQuote] = useAddQuoteMutation();
  const [updateQuote] = useUpdateQuoteMutation();

  useEffect(() => {
    if (selectedQuote) {
      setQuote(selectedQuote.quote);
      setAuthor(selectedQuote.author);
    }
  }, [selectedQuote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quote || !author) return;

    if (selectedQuote) {
      await updateQuote({ id: selectedQuote.id, quote, author, userId }); // Include userId for update
    } else {
      await addQuote({ quote, author, userId });
    }

    // Clear form
    setQuote('');
    setAuthor('');
    setSelectedQuote(null);
  };

  return (
    <div className='bg-slate-800 flex justify-center p-6'>
      <div className='w-full max-w-md'>
        <h1 className='text-4xl font-bold text-white mb-3 flex justify-center'>QuoteNest</h1>
        
        <p className="text-center text-gray-400 mb-1">Your personal collection of inspiration</p>
        <form onSubmit={handleSubmit} className='bg-slate-900 rounded-2xl px-7 py-5 shadow-lg'>
          <h2 className='text-white font-bold mb-3'>Add/Edit Quote</h2>
          <input
            className='w-full px-4 py-2 rounded-md outline-none mb-3 bg-slate-800 text-white'
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Quote"
            required
          />
          <input
            className='w-full px-4 py-2 rounded-md outline-none mb-3 bg-slate-800 text-white'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            required
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className='bg-blue-600 text-white rounded-md px-5 py-2 w-full hover:bg-blue-700'
            >
              {selectedQuote ? 'Update' : 'Save'}
            </button>
            {selectedQuote && (
              <button
                type="button"
                className='bg-gray-600 text-white rounded-md px-5 py-2 w-full hover:bg-gray-700'
                onClick={() => {
                  setQuote('');
                  setAuthor('');
                  setSelectedQuote(null);
                }}
              >
                Cancel
              </button>
            )}

          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default QuoteStruct;


