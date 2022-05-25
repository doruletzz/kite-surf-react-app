import React from "react";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";

import Map from "../../components/map/Map";
import SpotTable from "../../components/spot/SpotTable";
import { Container, Spinner } from "react-bootstrap";
import AppNavbar from "../../components/AppNavbar";
import { fetchUser, getUserById } from "../../features/user/slice";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <Container fluid className="p-0">
      <AppNavbar />
      {!user && <Navigate to="/login" replace={true} />}
      {/* <h1>home</h1> */}
      <Map />
      <SpotTable />
    </Container>
  );
};

export default Dashboard;
