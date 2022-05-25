import React, { useState } from "react";
import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../features/app/hooks";

import Map from "../../components/map/Map";
import SpotTable from "../../components/spot/SpotTable";
import { Container, Spinner } from "react-bootstrap";
import AppNavbar from "../../components/AppNavbar";
import { fetchUser, getUserById } from "../../features/user/slice";

export interface FilterOption {
  probability: number;
  country: string;
}

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (!user) return <Navigate to="/login" replace={true} />;
  const [filterOptions, setFilterOptions] = useState<FilterOption>({
    probability: 100,
    country: "",
  });

  const [isFilterSelected, setIsFilterSelected] = useState(false);

  return (
    <Container fluid className="p-0">
      <AppNavbar />
      <Map
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        isFilterSelected={isFilterSelected}
        setIsFilterSelected={setIsFilterSelected}
      />
      <SpotTable
        filterOptions={filterOptions}
        isFilterSelected={isFilterSelected}
      />
    </Container>
  );
};

export default Dashboard;
