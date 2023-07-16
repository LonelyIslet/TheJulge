import { persistReducer } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import toastReducer from "redux/slices/toastSlice";
import userReducer from "redux/slices/userSlice";
import errorModalReducer from "redux/slices/errorModalSlice";
import { apiSlice } from "redux/slices/apiSlice";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/es/storage";

const reducer = combineReducers({
  toast: toastReducer,
  errorModal: errorModalReducer,
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
