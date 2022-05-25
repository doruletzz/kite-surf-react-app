import { configureStore, Action } from "@reduxjs/toolkit";

import userReducer from "../user/slice";
import spotReducer from "../spot/slice";
import authReducer from "../auth/slice";
import { ThunkAction } from "redux-thunk";

export const store = configureStore({
  reducer: {
    user: userReducer,
    spot: spotReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
