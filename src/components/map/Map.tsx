import { Icon, LatLng, Point } from "leaflet";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Button, Spinner } from "react-bootstrap";

import markerUrl from "../../assets/default-marker.png";

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
import AddSpotButton from "./AddSpotForm";
import AddSpotForm from "./AddSpotForm";

// type MapProps = {
//   filterOptions: FilterOption;
//   setFilterOptions: Dispatch<SetStateAction<FilterOption>>;
//   isFilterSelected: boolean;
//   setIsFilterSelected: Dispatch<SetStateAction<boolean>>;
// };

const Map = () => {
  const [isAddSelected, setIsAddSelected] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [center, setCenter] = useState(new LatLng(21.505, -0.09));

  const [spotToAdd, setSpotToAdd] = useState<Spot>({
    id: -1,
    createdAt: new Date(),
    name: "",
    lat: 0,
    long: 0,
    probability: 0,
    country: "",
    month: "January",
  });

  useEffect(() => {
    if (spotToAdd.lat && spotToAdd.long) {
      setIsAddSelected(false);
      setShowAddForm(true);
    }
  }, [spotToAdd]);

  return (
    <div>
      <span className="anchor" id="map" />
      <MapContainer
        style={{ width: "100%", height: "24rem" }}
        doubleClickZoom={false}
        center={center}
        zoom={3}
        className="map_container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <SpotMarkers
          spotToAdd={spotToAdd}
          setSpotToAdd={setSpotToAdd}
          isAddSelected={isAddSelected}
        />

        <div className="filter_overlay">
          <Filter />
        </div>

        {showAddForm && (
          <div className="add_form_overlay">
            <AddSpotForm
              spot={spotToAdd}
              setSpot={setSpotToAdd}
              setShowAddForm={setShowAddForm}
            />
          </div>
        )}

        <div className="add_overlay">
          <Button
            className="add_button"
            onClick={() => setIsAddSelected((prev) => !prev)}
          >
            {isAddSelected ? "x" : <img src={markerUrl} width="100%" />}
          </Button>
        </div>
      </MapContainer>
    </div>
  );
};

export default Map;
