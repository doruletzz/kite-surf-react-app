import { LatLng } from 'leaflet';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useMapEvents } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../../features/app/hooks';
import {
	getAllFavouriteSpots,
	getAllSpots,
} from '../../../features/spot/slice';
import { FavouriteSpot, Spot } from '../../../features/spot/types';
import { filterSpot } from '../table/SpotTable';
import SpotMarker from './SpotMarker';

type SpotMarkerProps = {
	spotToAdd: Spot;
	setSpotToAdd: Dispatch<SetStateAction<Spot>>;
	isAddSelected: boolean;
};

const SpotMarkers = ({
	spotToAdd,
	setSpotToAdd,
	isAddSelected,
}: SpotMarkerProps) => {
	const { favourites, filter, spots, isFetching, error } = useAppSelector(
		(state) => state.spot
	);
	const dispatch = useAppDispatch();

	const map = useMapEvents(
		isAddSelected
			? {
					click(e) {
						setSpotToAdd((prev: Spot) => ({
							...prev,
							lat: e.latlng.lat % 180,
							long: e.latlng.lng % 180,
						}));
					},
			  }
			: { click(e) {} }
	);

	useEffect(() => {
		map.setView(new LatLng(spotToAdd.lat, spotToAdd.long), map.getZoom());
	}, [spotToAdd]);

	useEffect(() => {
		if (!spots.length) dispatch(getAllSpots());
		else console.log(spots);

		if (!favourites.length) dispatch(getAllFavouriteSpots());
		else console.log(favourites);
	}, []);

	const getFavouriteById = (spotId: number): FavouriteSpot | null => {
		for (const el of favourites) {
			if (typeof el.spot === 'number') {
				if (el.spot === spotId) {
					return el;
				}
			} else if (el.spot.id === spotId) {
				return el;
			}
		}

		return null;
	};

	if (error) return <p>{error.message}</p>;

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
