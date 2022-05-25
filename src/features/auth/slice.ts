import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setTokenToLocalStorage,
  getTokenFromLocalStorage,
  deleteTokenFromLocalStorage,
} from "../../utils/auth/token";
import { SERVER_URL } from "../../utils/constants";
import { AppThunk } from "../app/store";
import { Entity, Error } from "../user/slice";

export interface Token {
  token: number;
}

export type AuthType = {
  token: Token | null;
  error: Error | null;
};

export const initialState: AuthType = {
  token: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadToken: (state, action: PayloadAction<Token>) => {
      console.log("loading token");
      state.token = action.payload;
    },
    loadError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    unloadToken: (state) => {
      state.token = null;
    },
  },
});

const { actions, reducer } = authSlice;

export const { loadToken, loadError, unloadToken } = actions;

// loads token from local storage
export const loadTokenFromStorage = (): AppThunk => {
  return async (dispatch) => {
    const token = await getTokenFromLocalStorage();
    if (token) dispatch(loadToken({ token: parseInt(token) }));
  };
};

// attempts login to server
export const login = (username: string, password: string): AppThunk => {
  return async (dispatch) => {
    console.log("fetching user");
    axios
      .post(SERVER_URL + "login", {
        username,
        password,
      })
      .then(({ data }) => {
        const token: Token = { token: data.userId };
        dispatch(loadToken(token));
      })
      .catch((error) => dispatch(loadError(error)));
  };
};

export default reducer;
