import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk } from "../app/store";

import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import {
  deleteTokenFromLocalStorage,
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "../../utils/auth/token";

export interface Error {
  message: string;
}

export interface Entity {
  id: number;
}

export interface User extends Entity {
  createdAt: Date;
  name: string;
  email: string;
  avatar: string;
}

export type UserState = {
  isFetching: boolean;
  error: Error | null;
  user: User | null;
};

const initialState: UserState = {
  isFetching: false,
  error: null,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser: (state) => {
      state.isFetching = true;
    },

    receiveUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isFetching = false;
    },

    fetchFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.isFetching = false;
    },

    removeUser: (state) => {
      deleteTokenFromLocalStorage();
      console.log(getTokenFromLocalStorage());
      state.user = null;
    },
  },
});

const { actions, reducer } = userSlice;

export const { receiveUser, fetchFailed, fetchUser, removeUser } = actions;

export const getUserById = (id: number): AppThunk => {
  return async (dispatch) => {
    dispatch(fetchUser());
    axios
      .get(SERVER_URL + "/user/" + id)
      .then(({ data }) => {
        console.log(data);
        setTokenToLocalStorage(id);
        dispatch(receiveUser(data));
      })
      .catch((error) => {
        deleteTokenFromLocalStorage();
        dispatch(fetchFailed(error));
      });
  };
};

export default reducer;
