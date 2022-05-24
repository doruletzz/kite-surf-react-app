import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { AppThunk } from "../app/store";
import { Entity, Error } from "../user/slice";

export interface FavouriteSpot extends Entity {
  createdAt: Date;
  spot: Spot | number;
}

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
  error: Error | null;
  spots: Array<Spot>;
  favourites: Array<FavouriteSpot>;
};

const initialState: UserState = {
  isFetching: false,
  error: null,
  spots: [],
  favourites: [],
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

    fetchAllSpotsFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.isFetching = false;
    },
    fetchAllFavouriteSpots: (state) => {
      state.isFetching = true;
    },

    receiveAllFavouriteSpots: (
      state,
      action: PayloadAction<Array<FavouriteSpot>>
    ) => {
      state.favourites = action.payload;
      state.isFetching = false;
    },

    fetchAllFavouriteSpotsFailed: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.isFetching = false;
    },
    saveFavouriteSpot: (state, action: PayloadAction<FavouriteSpot>) => {
      state.favourites = state.favourites.concat(action.payload);
    },
    errorFavouriteSpot: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
    },
    removeFavouriteSpot: (state, action: PayloadAction<FavouriteSpot>) => {
      state.favourites = state.favourites.filter(
        (fs) => fs.id !== action.payload.id
      );
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

export const addFavouriteSpot = (fs: Spot): AppThunk => {
  const favSpot = { createdAt: new Date(), id: -1, spot: fs } as FavouriteSpot;

  return async (dispatch) => {
    axios
      .post(SERVER_URL + "/favourites", favSpot)
      .then(({ data }) => {
        console.log(data);
        dispatch(saveFavouriteSpot(data));
      })
      .catch((error) => dispatch(errorFavouriteSpot(error)));
  };
};

export const deleteFavouriteSpot = (fs: FavouriteSpot): AppThunk => {
  return async (dispatch) => {
    axios
      .delete(SERVER_URL + "/favourites/" + fs.id)
      .then(({ data }) => {
        console.log(data);
        dispatch(removeFavouriteSpot(data));
      })
      .catch((error) => dispatch(errorFavouriteSpot(error)));
  };
};

export const getAllFavouriteSpots = (): AppThunk => {
  return async (dispatch) => {
    dispatch(fetchAllFavouriteSpots());
    axios
      .get(SERVER_URL + "/favourites")
      .then(({ data }) => {
        console.log(data);
        dispatch(receiveAllFavouriteSpots(data));
      })
      .catch((error) => dispatch(fetchAllFavouriteSpotsFailed(error)));
  };
};

const { actions, reducer } = spotSlice;

export const {
  receiveAllSpots,
  fetchAllSpotsFailed,
  fetchAllSpots,
  receiveAllFavouriteSpots,
  fetchAllFavouriteSpotsFailed,
  fetchAllFavouriteSpots,
  saveFavouriteSpot,
  errorFavouriteSpot,
  removeFavouriteSpot,
} = actions;

export default reducer;
