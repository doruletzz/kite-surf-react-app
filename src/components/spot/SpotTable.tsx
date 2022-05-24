import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { getAllFavouriteSpots, getAllSpots } from "../../features/spot/slice";

const SpotTable = () => {
  const { spots, isFetching, error } = useAppSelector((state) => state.spot);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!spots.length) dispatch(getAllSpots());
    else console.log(spots);
  }, []);

  if (isFetching) return <Spinner animation="border" />;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {spots && (
        <Table>
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
            {spots.map((spot) => (
              <tr key={spot.id}>
                <td>{spot.name}</td>
                <td>{spot.country}</td>
                <td>{spot.lat}</td>
                <td>{spot.long}</td>
                <td>{spot.probability}</td>
                <td>{spot.month}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default SpotTable;
