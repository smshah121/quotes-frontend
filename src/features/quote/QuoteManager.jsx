import { useState } from 'react';
import QuoteStruct from './QuoteStructure';

import { useGetQuotesQuery } from './quoteapi';
import { useParams } from 'react-router-dom';
import QuotePrint from './QuotePrint';




const QuoteManager = () => {
  const { userId } = useParams();
  const [selectedQuote, setSelectedQuote] = useState(null);
  const { data: quotes, error, isLoading } = useGetQuotesQuery(userId);
    
  
  if (isLoading) {
    return <p className="text-white text-center">Loading quotes...</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center">Error fetching quotes!</p>;
  }

  return (
    <div>
      <QuoteStruct selectedQuote={selectedQuote} setSelectedQuote={setSelectedQuote} />
      <QuotePrint quotes={quotes} setSelectedQuote={setSelectedQuote} />
    </div>
  );
};

export default QuoteManager;