import React, { useEffect } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";
import { getAllFavouriteSpots, getAllSpots } from "../../features/spot/slice";

import "./SpotTable.scss";

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
    <Container className="table_container">
      <span className="anchor" id="locations" />
      <h1 className="mt-4 heading">Locations</h1>
      {spots && (
        <div className="content_table">
          <Table className="content_table">
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
                  <td>{spot.lat}° N</td>
                  <td>{spot.long}° W</td>
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
