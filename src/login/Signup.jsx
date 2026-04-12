import React, { useState } from 'react';
import { useSignupMutation } from '../features/auth/authApi';
import { useNavigate, Link } from 'react-router-dom';

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const getPasswordStrength = (val) => {
  if (!val) return { score: 0, label: '', color: '' };
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  if (score <= 1) return { score, label: 'Weak',   color: 'text-red-600' };
  if (score <= 2) return { score, label: 'Fair',   color: 'text-amber-600' };
  return               { score, label: 'Strong', color: 'text-green-700' };
};

const strengthBarColor = (score) => {
  if (score <= 1) return 'bg-red-400';
  if (score <= 2) return 'bg-amber-400';
  return 'bg-green-600';
};

const Signup = () => {
  const [name, setName]                   = useState('');
  const [email, setEmail]                 = useState('');
  const [password, setPassword]           = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched]             = useState({});
  const [signup, { isLoading, error }]    = useSignupMutation();
  const navigate = useNavigate();

  const strength = getPasswordStrength(password);

  const passwordTooShort  = password.length > 0 && password.length < 8;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;
  const passwordsMatch    = confirmPassword.length > 0 && password === confirmPassword && password.length >= 8;

  const isFormValid =
    name.trim() &&
    email.trim() &&
    password.length >= 8 &&
    password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      await signup({ name, email, password }).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-9">

          {/* Logo mark */}
          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#3B6D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
          </div>

          <h1 className="text-xl font-medium text-gray-900 text-center">Create an account</h1>
          <p className="text-sm text-gray-500 text-center mt-1 mb-6">
            Join us — it only takes a minute
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1.5">
                Full name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <UserIcon />
                </span>
                <input
                  id="name" type="text" autoComplete="name" required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg
                    placeholder-gray-400 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700
                    transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <MailIcon />
                </span>
                <input
                  id="email" type="email" autoComplete="email" required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg
                    placeholder-gray-400 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-green-700/20 focus:border-green-700
                    transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <LockIcon />
                </span>
                <input
                  id="password" type="password" autoComplete="new-password" required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, password: true }))}
                  placeholder="Min. 8 characters"
                  className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-lg
                    placeholder-gray-400 text-gray-900 transition-colors
                    focus:outline-none focus:ring-2
                    ${passwordTooShort && touched.password
                      ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
                      : 'border-gray-300 focus:ring-green-700/20 focus:border-green-700'
                    }`}
                />
              </div>

              {/* Strength meter */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i}
                        className={`flex-1 h-1 rounded-full transition-colors ${
                          i <= strength.score ? strengthBarColor(strength.score) : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs ${strength.color}`}>{strength.label}</p>
                    {passwordTooShort && touched.password && (
                      <p className="text-xs text-red-500">Minimum 8 characters</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <LockIcon />
                </span>
                <input
                  id="confirmPassword" type="password" autoComplete="new-password" required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setTouched(t => ({ ...t, confirm: true }))}
                  placeholder="Re-enter your password"
                  className={`w-full pl-9 pr-9 py-2.5 text-sm border rounded-lg
                    placeholder-gray-400 text-gray-900 transition-colors
                    focus:outline-none focus:ring-2
                    ${passwordsMismatch
                      ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
                      : passwordsMatch
                        ? 'border-green-500 focus:ring-green-500/20 focus:border-green-600'
                        : 'border-gray-300 focus:ring-green-700/20 focus:border-green-700'
                    }`}
                />
                {/* Match / mismatch icon */}
                {confirmPassword && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    {passwordsMatch ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="#3B6D11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="#E24B4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    )}
                  </span>
                )}
              </div>
              {passwordsMismatch && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
              {passwordsMatch && (
                <p className="text-xs text-green-700 mt-1">Passwords match</p>
              )}
            </div>

            {/* API Error */}
            {error && (
              <div className="flex items-start gap-2.5 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg">
                <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p className="text-sm text-red-700">
                  This email is already in use. Try a different one.
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full py-2.5 px-4 bg-green-800 hover:bg-green-900 text-white text-sm font-medium
                rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  Creating account…
                </span>
              ) : 'Create account'}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{' '}
            <Link to="/" className="text-green-800 font-medium hover:text-green-700 transition-colors">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Signup;