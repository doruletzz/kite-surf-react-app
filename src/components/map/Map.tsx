import React from "react";

import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer
      style={{ width: "100%", height: "24rem" }}
      center={[51.505, -0.09]}
      zoom={3}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
