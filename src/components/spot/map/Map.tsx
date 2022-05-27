import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import markerUrl from "../../assets/default-marker.png";

import { MapContainer, TileLayer } from "react-leaflet";

import "./Map.scss";
import Filter from "./Filter";
import SpotMarkers from "./SpotMarkers";
import AddSpotForm from "./AddSpotForm";
import { Spot } from "../../../features/spot/types";

const Map = () => {
  const [isAddSelected, setIsAddSelected] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

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
        center={[51.009, -0.006]}
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
