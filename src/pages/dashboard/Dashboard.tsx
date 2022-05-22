import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../features/app/hooks";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div>
      {!user && <Navigate to="/login" replace={true} />}
      <h1>home</h1>
    </div>
  );
};

export default Dashboard;
