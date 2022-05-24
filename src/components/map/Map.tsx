import { Icon, Point } from "leaflet";
import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";

import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { getAllFavouriteSpots, getAllSpots } from "../../features/spot/slice";

import defaultMarkerUrl from "../../assets/default-marker.png";
import highlightedMarkerUrl from "../../assets/highlighted-marker.png";

import "./Map.scss";

const Map = () => {
  const { favourites, spots, isFetching, error } = useAppSelector(
    (state) => state.spot
  );
  const dispatch = useAppDispatch();

  const isFavourite = (spotId: number) => {
    for (const el of favourites) {
      if (typeof el.spot === "number") {
        if (el.spot === spotId) {
          console.log(el.spot, spotId);
          return true;
        }
      } else if (el.spot.id === spotId) {
        console.log(el.spot, spotId);

        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    if (!spots.length) dispatch(getAllSpots());
    else console.log(spots);

    if (!favourites.length) dispatch(getAllFavouriteSpots());
    else console.log(favourites);
  }, []);

  if (isFetching) return <Spinner animation="border" />;

  if (error) return <p>{error.message}</p>;

  return (
    <MapContainer
      style={{ width: "100%", height: "24rem" }}
      center={[45.2218, 106.8426]}
      zoom={3}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {spots.map((spot) => {
        const isFav = isFavourite(spot.id);
        return (
          <Marker
            icon={
              new Icon({
                iconUrl: isFav ? highlightedMarkerUrl : defaultMarkerUrl,
                iconSize: new Point(30, 40),
              })
            }
            key={spot.id}
            position={[spot.lat, spot.long]}
          >
            <Popup className={"popup "}>
              <div className="item_container">
                <h4 className="item">{`${spot.name} ${isFav ? "⭐" : ""}`}</h4>
                <h5 className="item">{spot.country}</h5>

                <h5 className="item">WIND PROBABILITY</h5>
                <h6 className="item">{spot.probability}</h6>

                <h5 className="item">LATITUDE</h5>
                <h6 className="item">{spot.lat}° N</h6>

                <h5 className="item">LONGITUDE</h5>
                <h6 className="item">{spot.long}° N</h6>

                <h5 className="item">WHEN TO GO</h5>
                <h6 className="item">{spot.month}</h6>

                <button className={"button"}>+ ADD TO FAVOURITES</button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
