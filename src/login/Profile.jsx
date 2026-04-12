import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery, useUpdateUserMutation } from '../features/user/userApi';



const Profile = () => {
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetCurrentUserQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: '', text: '' });

  const handleChangePassword = async () => {
    // Clear previous messages
    setUpdateMessage({ type: '', text: '' });

    // Validation
    if (!password || password.length < 6) {
      setUpdateMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    if (password !== confirmPassword) {
      setUpdateMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    try {
      const result = await updateUser({ id: user.id, password }).unwrap();
      console.log('Update result:', result); // Debug log
      
      setUpdateMessage({ type: 'success', text: 'Password updated successfully!' });
      setPassword('');
      setConfirmPassword('');
      
      // Close form after 2 seconds
      setTimeout(() => {
        setShowPasswordForm(false);
        setUpdateMessage({ type: '', text: '' });
      }, 2000);
      
    } catch (err) {
      console.error('Update error:', err); // Debug log
      setUpdateMessage({ 
        type: 'error', 
        text: err?.data?.message || 'Failed to update password. Please try again.' 
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#e60023] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#555]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">⚠️ Failed to load profile</p>
          <button 
            onClick={() => navigate('/quotes')}
            className="text-[#e60023] hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/quotes")}
            className="flex items-center gap-2 text-[#e60023] hover:text-[#d01f1f] font-medium mb-6 transition-colors"
          >
            <span>←</span>
            <span>Back to Quotes</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e60023] to-[#ff4458] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#111]">My Profile</h1>
              <p className="text-[#555]">Manage your account settings</p>
            </div>
          </div>
        </div>

        {/* Profile Information Card */}
        <div className="bg-white border-2 border-red-100 rounded-2xl p-8 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#111] mb-6 pb-4 border-b border-red-100">
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4 py-3">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#555] mb-1">Full Name</p>
                <p className="text-[#111] font-semibold">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-3">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <span className="text-xl">📧</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#555] mb-1">Email Address</p>
                <p className="text-[#111] font-semibold">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 py-3">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <span className="text-xl">🆔</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#555] mb-1">User ID</p>
                <p className="text-[#111] font-mono font-semibold">#{user?.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Password Change Card */}
        <div className="bg-white border-2 border-red-100 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#111]">Security</h2>
              <p className="text-sm text-[#555] mt-1">Update your password</p>
            </div>
            <button
              onClick={() => {
                setShowPasswordForm(!showPasswordForm);
                setUpdateMessage({ type: '', text: '' });
                setPassword('');
                setConfirmPassword('');
              }}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                showPasswordForm
                  ? 'bg-white border-2 border-red-100 text-[#e60023] hover:bg-red-50'
                  : 'bg-[#e60023] text-white hover:bg-[#d01f1f] shadow-md hover:shadow-lg'
              }`}
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {showPasswordForm && (
            <div className="space-y-4 pt-6 border-t border-red-100 animate-fadeIn">
              {/* Success/Error Message */}
              {updateMessage.text && (
                <div
                  className={`p-4 rounded-lg border-2 ${
                    updateMessage.type === 'success'
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-red-50 border-red-200 text-red-700'
                  }`}
                >
                  <p className="font-medium">
                    {updateMessage.type === 'success' ? '✅' : '❌'} {updateMessage.text}
                  </p>
                </div>
              )}

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password (min. 6 characters)"
                  className="w-full px-4 py-3 border-2 border-red-100 rounded-lg focus:outline-none focus:border-[#e60023] transition-colors"
                  disabled={isUpdating}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-[#333] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 border-2 border-red-100 rounded-lg focus:outline-none focus:border-[#e60023] transition-colors"
                  disabled={isUpdating}
                />
              </div>

              {/* Update Button */}
              <button
                onClick={handleChangePassword}
                disabled={isUpdating || !password || !confirmPassword}
                className="w-full py-3 bg-[#e60023] text-white font-semibold rounded-full hover:bg-[#d01f1f] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;