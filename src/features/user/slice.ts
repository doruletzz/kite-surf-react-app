import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk } from "../app/store";

import axios from "axios";
import { SERVER_URL } from "../../utils/constants";

export interface FetchError {
  message: string;
}

export interface User {
  id: number;
  createdAt: Date;
  name: string;
  email: string;
  avatar: string;
}

export type UserState = {
  isFetching: boolean;
  error: FetchError | null;
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

    fetchFailed: (state, action: PayloadAction<FetchError>) => {
      state.error = action.payload;
      state.isFetching = false;
    },
  },
});

const { actions, reducer } = userSlice;

export const { receiveUser, fetchFailed, fetchUser } = actions;

export const fetchUserById = (id: number): AppThunk => {
  return async (dispatch) => {
    dispatch(fetchUser());
    axios
      .get(SERVER_URL + "/user/" + id)
      .then(({ data }) => {
        console.log(data);
        dispatch(receiveUser(data));
      })
      .catch((error) => dispatch(fetchFailed(error)));
  };
};

export default reducer;
