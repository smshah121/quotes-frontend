import React, { useEffect, useState } from 'react';
import { useAddQuoteMutation, useUpdateQuoteMutation } from './quoteapi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { logout } from '../auth/authSlice';
import { FaRegBookmark } from "react-icons/fa";

const QuoteIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

// const LogoutIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//     stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
//     <polyline points="16 17 21 12 16 7"/>
//     <line x1="21" y1="12" x2="9" y2="12"/>
//   </svg>
// );

const QuoteStruct = ({ selectedQuote, setSelectedQuote }) => {
  const [author, setAuthor] = useState('');
  const [quote, setQuote]   = useState('');
  const userId              = useSelector((state) => state.auth.userId);
  const [addQuote]          = useAddQuoteMutation();
  const [updateQuote]       = useUpdateQuoteMutation();
  const navigate            = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedQuote) {
      setQuote(selectedQuote.quote);
      setAuthor(selectedQuote.author);
    }
  }, [selectedQuote]);
   const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quote || !author) return;
    if (selectedQuote) {
      await updateQuote({ id: selectedQuote.id, quote, author, userId });
    } else {
      await addQuote({ quote, author, userId });
    }
    setQuote('');
    setAuthor('');
    setSelectedQuote(null);

    navigate('/savedquotes');
  };

  const handleCancel = () => {
    setQuote('');
    setAuthor('');
    setSelectedQuote(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-5 pt-4 pb-0">

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-700 flex items-center justify-center shrink-0">
            <QuoteIcon size={15} color="#DDD8FF" />
          </div>
          <span className="text-lg font-medium text-slate-100">QuoteNest</span>
        </div>

        {/* Nav actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
              text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <UserIcon />
          
          </button>
          <button onClick={()=>navigate('/savedquotes')}
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
              text-slate-300 bg-white/5 hover:bg-white/10 transition-colors'
            >
            <FaRegBookmark size={24}/>
          </button>

          {/* Wrap your existing LogoutButton or replace with this styled version */}
         <button className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
            text-red-300 bg-red-500/10 hover:bg-red-500/20 transition-colors' onClick={handleLogout}>< CiLogout size={16} /></button>

          {/* ↑ If LogoutButton doesn't accept className, use a plain button instead: */}
          {/*
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
              text-red-300 bg-red-500/10 hover:bg-red-500/20 transition-colors"
          >
            <LogoutIcon />
            Logout
          </button>
          */}
        </div>
      </div>

      {/* ── Subtitle ── */}
      <p className="text-center text-sm text-slate-500 mt-6 mb-5">
        Your personal collection of inspiration
      </p>

      {/* ── Form card ── */}
      <div className="max-w-md mx-auto px-4">
        <div className="bg-slate-800 rounded-2xl border border-white/[0.07] px-6 py-5">

          {/* Card header */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-slate-200">
              {selectedQuote ? 'Edit quote' : 'Add a quote'}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300">
              {selectedQuote ? 'Editing' : 'New'}
            </span>
          </div>

          <hr className="border-white/[0.07] mb-4" />

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Quote textarea */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Quote
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500 pointer-events-none">
                  <QuoteIcon />
                </span>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Enter an inspiring quote…"
                  required
                  rows={3}
                  className="w-full pl-8 pr-3 py-2.5 text-sm bg-slate-900 text-slate-200
                    border border-white/10 rounded-lg placeholder-slate-600 resize-none
                    focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500
                    transition-colors"
                />
              </div>
            </div>

            {/* Author input */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Author
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <UserIcon />
                </span>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Who said it?"
                  required
                  className="w-full pl-8 pr-3 py-2.5 text-sm bg-slate-900 text-slate-200
                    border border-white/10 rounded-lg placeholder-slate-600
                    focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500
                    transition-colors"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className={`flex gap-2.5 pt-1 ${selectedQuote ? '' : ''}`}>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white
                  bg-violet-700 hover:bg-violet-800 transition-colors"
              >
                {selectedQuote ? 'Update quote' : 'Save quote'}
              </button>
              {selectedQuote && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium text-slate-400
                    bg-white/5 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>
      </div>

    </div>
  );
};

export default QuoteStruct;