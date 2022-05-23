import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../features/app/hooks";

import Map from "../../components/map/Map";
import SpotTable from "../../components/spot/SpotTable";
import { Container } from "react-bootstrap";
import AppNavbar from "../../components/AppNavbar";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Container>
      <AppNavbar />
      {/* {!user && <Navigate to="/login" replace={true} />} */}
      {/* <h1>home</h1> */}
      <Map />
      <SpotTable />
    </Container>
  );
};

export default Dashboard;
