import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuoteManager from './features/quote/QuoteManager';
import Login from './login/Login';
import Signup from './login/Signup';

const App = () => {
  return (
    <Routes>
      {/* Login route with its own layout */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Quotes route with a styled layout, now with userId parameter */}
      <Route
        path="/quotes/:userId"
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
