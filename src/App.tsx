import React from "react";
import LoginForm from "./pages/login/LoginForm";

import { Container } from "react-bootstrap";
import "leaflet/dist/leaflet.css";

import { Provider } from "react-redux";
import { Navigate } from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from "./features/app/store";
import Dashboard from "./pages/dashboard/Dashboard";

const App = () => {
  return (
    <main>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </Router>
      </Provider>
    </main>
  );
};
export default App;
