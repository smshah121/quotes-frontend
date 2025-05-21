import React, { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApi';
import { setToken, setUserId } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await login({ email, password }).unwrap();
    console.log("Login Response:", response);

    // ✅ Save to Redux
    dispatch(setToken(response.access_token));
    dispatch(setUserId(response.userId));

    // ✅ Also save to localStorage for RTK Query
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('user_id', response.userId);

    // Navigate to quotes
    navigate(`/quotes/${response.userId}`);
  } catch (err) {
    console.error('Login failed', err);
  }
};
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          {error && (
            <div className="p-3 mt-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-300">
              Login failed. Please check your credentials and try again.
            </div>
          )}
        </form>
        <div className="text-center mt-4">
  <p className="text-sm text-gray-600">
    Don't have an account?{' '}
    <Link
      to="/signup"
      className="font-medium text-blue-600 hover:text-blue-500"
    >
      Sign up here
    </Link>
  </p>
</div>
      </div>
    </div>
  );
};

export default Login;