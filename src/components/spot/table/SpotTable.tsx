import { useEffect } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../features/app/hooks';
import { getAllSpots } from '../../../features/spot/slice';
import { FilterOption, Spot } from '../../../features/spot/types';

import './SpotTable.scss';

export const filterSpot = (
	spot: Spot,
	filterOptions: FilterOption
): boolean => {
	return (
		spot.probability >= filterOptions.probability &&
		spot.country
			.toLowerCase()
			.startsWith(filterOptions.country.toLowerCase())
	);
};

const SpotTable = () => {
	const { spots, filter, isFetching, error } = useAppSelector(
		(state) => state.spot
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!spots.length) dispatch(getAllSpots());
		else console.log(spots);
	}, []);

	if (isFetching)
		return (
			<div className='d-flex justify-content-center mt-4'>
				<Spinner animation='border' />;
			</div>
		);

	if (error) return <p>{error.message}</p>;

	return (
		<Container className='table_container'>
			<span className='anchor' id='locations' />
			<h2 className='mt-4 heading'>Locations</h2>
			{spots && (
				<div className='content_table'>
					<Table className='content_table'>
						<thead>
							<tr>
								<th>Name</th>
								<th>Country</th>
								<th>Latitude</th>
								<th>Longitude</th>
								<th>Wind Prob</th>
								<th>When to go</th>
							</tr>
						</thead>
						<tbody>
							{(filter.isApplied
								? spots.filter((spot: Spot) =>
										filterSpot(spot, filter)
								  )
								: spots
							).map((spot: Spot) => (
								<tr key={spot.id}>
									<td>{spot.name}</td>
									<td>{spot.country}</td>
									<td>
										{parseFloat(
											spot.lat.toString()
										).toFixed(2)}
										° N
									</td>
									<td>
										{parseFloat(
											spot.long.toString()
										).toFixed(2)}
										° W
									</td>
									<td>{spot.probability}%</td>
									<td>{spot.month}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			)}
		</Container>
	);
};

export default SpotTable;
