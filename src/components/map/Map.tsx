import { Icon, Point } from "leaflet";
import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";

import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import {
  addFavouriteSpot,
  deleteFavouriteSpot,
  getAllFavouriteSpots,
  getAllSpots,
  removeFavouriteSpot,
  saveFavouriteSpot,
} from "../../features/spot/slice";

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
          return el;
        }
      } else if (el.spot.id === spotId) {
        return el;
      }
    }

    return null;
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

        {spots.map((spot) => {
          const fav = isFavourite(spot.id);
          return (
            <Marker
              icon={
                new Icon({
                  iconUrl: fav ? highlightedMarkerUrl : defaultMarkerUrl,
                  iconSize: new Point(30, 42),
                })
              }
              key={spot.id}
              position={[spot.lat, spot.long]}
            >
              <Popup className={"popup "}>
                <div className="item_container">
                  <h4 className="item">{`${spot.name} ${fav ? "⭐" : ""}`}</h4>
                  <h5 className="item">{spot.country}</h5>
                  <br />

                  <h5 className="item">WIND PROBABILITY</h5>
                  <h6 className="item">{spot.probability}%</h6>

                  <h5 className="item">LATITUDE</h5>
                  <h6 className="item">{spot.lat}° N</h6>

                  <h5 className="item">LONGITUDE</h5>
                  <h6 className="item">{spot.long}° W</h6>

                  <h5 className="item">WHEN TO GO</h5>
                  <h6 className="item">{spot.month}</h6>

                  {fav ? (
                    <button
                      onClick={() => dispatch(deleteFavouriteSpot(fav))}
                      className={"button_remove"}
                    >
                      - REMOVE FROM FAVOURITES
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(addFavouriteSpot(spot))}
                      className={"button_add"}
                    >
                      + ADD TO FAVOURITES
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
