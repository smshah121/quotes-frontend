import React, { useState } from 'react';
import QuoteStruct from './QuoteStructure';
import QuotePrint from './QuotePrint';





const QuoteManager = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);

  return (
    <div>
      <QuoteStruct selectedQuote={selectedQuote} setSelectedQuote={setSelectedQuote} />
      <QuotePrint setSelectedQuote={setSelectedQuote} />
    </div>
  );
};

export default QuoteManager;
