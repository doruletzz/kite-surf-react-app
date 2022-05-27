import { Icon, Point } from "leaflet";
import { Popup, Marker } from "react-leaflet";
import {
  addFavouriteSpot,
  deleteFavouriteSpot,
} from "../../../features/spot/slice";

import defaultMarkerUrl from "../../../assets/default-marker.png";
import highlightedMarkerUrl from "../../../assets/highlighted-marker.png";
import { useAppDispatch } from "../../../features/app/hooks";

import "./MapMarker.scss";
import { FavouriteSpot, Spot } from "../../../features/spot/types";

type SpotMarkerProps = {
  spot: Spot;
  fav: FavouriteSpot | null;
};

const SpotMarker = ({ spot, fav }: SpotMarkerProps) => {
  const dispatch = useAppDispatch();

  return (
    <Marker
      icon={
        new Icon({
          iconUrl: fav ? highlightedMarkerUrl : defaultMarkerUrl,
          iconSize: new Point(30, 42),
        })
      }
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
};

export default SpotMarker;
