import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "redux/slices/toastSlice";
import { authApi } from "redux/api/authApi";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
