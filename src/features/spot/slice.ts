import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { AppThunk } from "../app/store";
import { FavouriteSpot, FilterOption, Spot } from "./types";

export type UserState = {
  isFetching: boolean;
  error: Error | null;
  spots: Array<Spot>;
  favourites: Array<FavouriteSpot>;
  filter: FilterOption;
};

const initialState: UserState = {
  isFetching: false,
  error: null,
  spots: [],
  favourites: [],
  filter: { probability: 0, country: "", isApplied: true },
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
    setFilter: (state, action: PayloadAction<FilterOption>) => {
      state.filter = action.payload;
    },
    saveSpot: (state, action: PayloadAction<Spot>) => {
      state.spots = [...state.spots, action.payload];
    },
    errorSpot: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
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

export const addSpot = (s: Spot): AppThunk => {
  return async (dispatch) => {
    axios
      .post(SERVER_URL + "/spot", s)
      .then(({ data }) => {
        console.log(data);
        dispatch(saveSpot(data));
      })
      .catch((error) => dispatch(errorSpot(error)));
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
  setFilter,
  saveSpot,
  errorSpot,
} = actions;

export default reducer;
