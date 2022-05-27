import { Navigate } from "react-router";
import { useAppSelector } from "../../features/app/hooks";

import Map from "../../components/spot/map/Map";
import SpotTable from "../../components/spot/table/SpotTable";
import { Container } from "react-bootstrap";
import NavBar from "../../components/navbar/NavBar";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) return <Navigate to="/login" replace={true} />;

  return (
    <Container fluid className="p-0">
      <NavBar />
      <Map />
      <SpotTable />
    </Container>
  );
};

export default Dashboard;
