import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import CustomerRegistration from "./components/CustomerRegistration";
import CustomerDashboard from "./components/CustomerDashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerRegistration />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route
          path="/admin/login"
          element={
            isAuthenticated ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <AdminLogin setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? (
              <AdminDashboard setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
