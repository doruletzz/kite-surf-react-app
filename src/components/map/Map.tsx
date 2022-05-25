import { Icon, Point } from "leaflet";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Spinner } from "react-bootstrap";

import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import {
  addFavouriteSpot,
  deleteFavouriteSpot,
  FavouriteSpot,
  getAllFavouriteSpots,
  getAllSpots,
  removeFavouriteSpot,
  saveFavouriteSpot,
} from "../../features/spot/slice";

import "./Map.scss";
import Filter from "./Filter";
import MapMarker from "./MapMarker";
import { FilterOption } from "../../pages/dashboard/Dashboard";
import { filterSpot } from "../spot/SpotTable";

type MapProps = {
  filterOptions: FilterOption;
  setFilterOptions: Dispatch<SetStateAction<FilterOption>>;
  isFilterSelected: boolean;
  setIsFilterSelected: Dispatch<SetStateAction<boolean>>;
};

const Map = ({
  filterOptions,
  setFilterOptions,
  isFilterSelected,
  setIsFilterSelected,
}: MapProps) => {
  const { favourites, spots, isFetching, error } = useAppSelector(
    (state) => state.spot
  );
  const dispatch = useAppDispatch();

  const getFavouriteById = (spotId: number): FavouriteSpot | null => {
    for (const el of favourites) {
      if (typeof el.spot === "number") {
        if (el.spot === spotId) {
          return el;
        }
      } else if (el.spot.id === spotId) {
        return el;
      }
    }

    return null;
  };

  useEffect(() => {
    console.log(filterOptions);
  }, [filterOptions]);

  useEffect(() => {
    if (!spots.length) dispatch(getAllSpots());
    else console.log(spots);

    if (!favourites.length) dispatch(getAllFavouriteSpots());
    else console.log(favourites);
  }, []);

  if (isFetching) return <Spinner animation="border" />;

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <span className="anchor" id="map" />
      <MapContainer
        style={{ width: "100%", height: "24rem" }}
        center={[45.2218, 106.8426]}
        zoom={3}
        className="map_container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <div className="overlay">
          <Filter
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            isFilterSelected={isFilterSelected}
            setIsFilterSelected={setIsFilterSelected}
          />
        </div>

        {(isFilterSelected
          ? spots.filter((spot) => filterSpot(spot, filterOptions))
          : spots
        ).map((spot) => {
          const fav = getFavouriteById(spot.id);
          return (
            <div key={spot.id}>
              <MapMarker spot={spot} fav={fav} />
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
