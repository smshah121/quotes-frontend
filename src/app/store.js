import { configureStore } from "@reduxjs/toolkit";
import { quoteApi } from "../features/quote/quoteapi";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { userApi } from "../features/user/userApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [quoteApi.reducerPath]: quoteApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      quoteApi.middleware,
      authApi.middleware
    ),
});
