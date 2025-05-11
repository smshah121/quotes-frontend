import { configureStore } from "@reduxjs/toolkit";
import { quoteApi } from "../features/quote/quoteapi";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [quoteApi.reducerPath]: quoteApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      quoteApi.middleware,
      authApi.middleware
    ),
});
