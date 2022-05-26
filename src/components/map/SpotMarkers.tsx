import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useMapEvents } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import {
  FavouriteSpot,
  getAllFavouriteSpots,
  getAllSpots,
  Spot,
} from "../../features/spot/slice";
import { filterSpot } from "../spot/SpotTable";
import SpotMarker from "./SpotMarker";

const SpotMarkers = () => {
  const { favourites, filter, spots, isFetching, error } = useAppSelector(
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
    if (!spots.length) dispatch(getAllSpots());
    else console.log(spots);

    if (!favourites.length) dispatch(getAllFavouriteSpots());
    else console.log(favourites);
  }, []);

  if (isFetching) return <Spinner animation="border" />;

  if (error) return <p>{error.message}</p>;

  // const [spotToAdd, setSpotToAdd] = useState<Spot>({
  //   id: -1,
  //   createdAt: new Date(),
  //   name: "",
  //   lat: 0,
  //   long: 0,
  //   probability: 0,
  //   country: "",
  //   month: "",
  // });

  // const map = useMapEvents({
  //   click(e) {
  //     setSpotToAdd((prev) => ({
  //       ...prev,
  //       lat: e.latlng.lat,
  //       long: e.latlng.lng,
  //     }));
  //   },
  // });

  // useEffect(() => {
  //   if(spotToAdd.lat && spotToAdd.long)

  // }, [spotToAdd]);

  return (
    <div>
      {(filter.isApplied
        ? spots.filter((spot) => filterSpot(spot, filter))
        : spots
      ).map((spot) => {
        const fav = getFavouriteById(spot.id);

        return (
          <div key={spot.id}>
            <SpotMarker spot={spot} fav={fav} />
          </div>
        );
      })}
    </div>
  );
};

export default SpotMarkers;
