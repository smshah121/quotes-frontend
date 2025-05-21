import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectTokenValue } from '../features/auth/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectTokenValue);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!isLoggedIn) return null;

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl"
    >
      LOGOUT
    </button>
  );
};

export default LogoutButton;
