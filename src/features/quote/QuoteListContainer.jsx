import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const QuoteListContainer = () => {
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token); // Get token from Redux
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) { // Remove token from here.  The fetchQuotes function handles it.
      setLoading(true);
      setError(null);
      fetchQuotes(userId, token) // Pass the token!
        .then(data => {
          setQuotes(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message || 'Failed to fetch quotes');
          setLoading(false);
        });
    }
     else {
      setLoading(false);
      setError('UserId not available. Please login.');
    }
  }, [userId]);

  const fetchQuotes = async (userId, token) => {
    console.log("Fetching quotes for userId:", userId);
    console.log("Token being sent:", token);  // Keep this for debugging
    const response = await fetch(`https://quotes-management-system-backend.vercel.app/quotes/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, //  <---  CRUCIAL: Include the header here!
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  if (loading) {
    return <p className="text-white text-center">Loading quotes...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

          return (
            <div className="bg-slate-800 text-white flex flex-col items-center p-4 gap-4">
              {quotes.length > 0 ? (
                quotes.map(quote => (
                  <div
                    key={quote.id}
                    className="flex items-center justify-between bg-slate-900 p-3 rounded w-full max-w-md shadow-md"
                  >
                    <div>
                      <h2 className="text-base font-medium">"{quote.quote}"</h2>
                      <h6 className="text-xs text-gray-300">- {quote.author}</h6>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No quotes found.</p>
              )}
            </div>
          );
        };

        export default QuoteListContainer;
        