import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuoteManager from './features/quote/QuoteManager';
import Login from './login/Login';

const App = () => {
  return (
    <Routes>
      {/* Login route with its own layout */}
      <Route path='/' element={<Login />} />

      {/* Quotes route with a styled layout */}
      <Route
        path='/quotes'
        element={
          <div className="bg-slate-800 h-screen flex flex-col">
            <QuoteManager />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
