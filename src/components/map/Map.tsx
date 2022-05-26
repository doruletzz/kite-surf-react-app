import { Icon, Point } from "leaflet";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Spinner } from "react-bootstrap";

import {
  MapContainer,
  TileLayer,
  useMap,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import {
  addFavouriteSpot,
  deleteFavouriteSpot,
  FavouriteSpot,
  getAllFavouriteSpots,
  getAllSpots,
  removeFavouriteSpot,
  saveFavouriteSpot,
  Spot,
} from "../../features/spot/slice";

import "./Map.scss";
import Filter from "./Filter";
import SpotMarker from "./SpotMarker";
import { filterSpot } from "../spot/SpotTable";
import SpotMarkers from "./SpotMarkers";

// type MapProps = {
//   filterOptions: FilterOption;
//   setFilterOptions: Dispatch<SetStateAction<FilterOption>>;
//   isFilterSelected: boolean;
//   setIsFilterSelected: Dispatch<SetStateAction<boolean>>;
// };

const Map = () => {
  return (
    <div>
      <span className="anchor" id="map" />
      <MapContainer
        doubleClickZoom={false}
        style={{ width: "100%", height: "24rem" }}
        center={[51.505, -0.09]}
        zoom={3}
        className="map_container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <SpotMarkers />

        <div className="overlay">
          <Filter />
        </div>
      </MapContainer>
    </div>
  );
};

export default Map;
