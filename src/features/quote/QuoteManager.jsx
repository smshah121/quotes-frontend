import { useState } from 'react';
import QuoteStruct from './QuoteStructure';
import { useGetQuotesQuery } from './quoteapi';
import { useParams } from 'react-router-dom';

const QuoteManager = () => {
  const { userId } = useParams();
  const [selectedQuote, setSelectedQuote] = useState(null);

  const { error, isLoading } = useGetQuotesQuery(userId);

  if (isLoading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error!</p>;
  }

  return (
    <div>
      <QuoteStruct
        selectedQuote={selectedQuote}
        setSelectedQuote={setSelectedQuote}
      />
    </div>
  );
};

export default QuoteManager;