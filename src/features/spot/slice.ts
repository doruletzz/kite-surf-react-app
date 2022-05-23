import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { AppThunk } from "../app/store";
import { Entity, FetchError } from "../user/slice";

export interface Spot extends Entity {
  createdAt: Date;
  name: string;
  country: string;
  lat: number;
  long: number;
  probability: number;
  month: string;
}

export type UserState = {
  isFetching: boolean;
  error: FetchError | null;
  spots: Array<Spot>;
};

const initialState: UserState = {
  isFetching: false,
  error: null,
  spots: [],
};

export const spotSlice = createSlice({
  name: "spot",
  initialState,
  reducers: {
    fetchAllSpots: (state) => {
      state.isFetching = true;
    },

    receiveAllSpots: (state, action: PayloadAction<Array<Spot>>) => {
      state.spots = action.payload;
      state.isFetching = false;
    },

    fetchAllSpotsFailed: (state, action: PayloadAction<FetchError>) => {
      state.error = action.payload;
      state.isFetching = false;
    },
  },
});

export const getAllSpots = (): AppThunk => {
  return async (dispatch) => {
    dispatch(fetchAllSpots());
    axios
      .get(SERVER_URL + "/spot")
      .then(({ data }) => {
        console.log(data);
        dispatch(receiveAllSpots(data));
      })
      .catch((error) => dispatch(fetchAllSpotsFailed(error)));
  };
};

const { actions, reducer } = spotSlice;

export const { receiveAllSpots, fetchAllSpotsFailed, fetchAllSpots } = actions;

export default reducer;
