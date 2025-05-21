import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null, // Add userId to the initial state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      state.userId = null; // Clear userId on logout
      localStorage.removeItem('userId');
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
      state.userId = null;
      localStorage.removeItem('userId');
    },
  },
});

export const { setToken, clearToken, setUserId, logout } = authSlice.actions;

export const selectTokenValue = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
