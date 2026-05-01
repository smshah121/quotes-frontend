import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuoteManager from './features/quote/QuoteManager';
import Login from './login/Login';
import Signup from './login/Signup';
import OAuthSuccess from './login/OAuthSuccess';
import Profile from './login/Profile';
import SavedQuotes from './features/quote/SavedQuotes';
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      {/* Login route with its own layout */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/savedquotes' element={<SavedQuotes/>}/>
     

      {/* Quotes route with a styled layout, now with userId parameter */}
      <Route
        path="/quotes"
        element={
          <div className="bg-slate-800 h-screen flex flex-col">
            <QuoteManager />
          </div>
        }
      />
    </Routes>
    </>
  );
};

export default App;
