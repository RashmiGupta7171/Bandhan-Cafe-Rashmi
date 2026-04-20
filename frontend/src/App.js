import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 🔐 Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Salary from "./pages/Salary";
import Attendance from "./pages/Attendance";
import Finance from "./pages/Finance";

// 🆕 New Pages
import MainApp from "./pages/MainApp";   // Billing + Menu
import Charts from "./pages/Charts";     // Charts dashboard

// 🔐 Protected Route
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 Login */}
        <Route path="/" element={<Login />} />

        {/* 🏠 Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 💰 Salary */}
        <Route
          path="/salary"
          element={
            <PrivateRoute>
              <Salary />
            </PrivateRoute>
          }
        />

        {/* 📅 Attendance */}
        <Route
          path="/attendance"
          element={
            <PrivateRoute>
              <Attendance />
            </PrivateRoute>
          }
        />

        {/* 📊 Finance */}
        <Route
          path="/finance"
          element={
            <PrivateRoute>
              <Finance />
            </PrivateRoute>
          }
        />

        {/* 🍽️ Billing (Menu System) */}
        <Route
          path="/billing"
          element={
            <PrivateRoute>
              <MainApp />
            </PrivateRoute>
          }
        />

        {/* 📈 Charts */}
        <Route
          path="/charts"
          element={
            <PrivateRoute>
              <Charts />
            </PrivateRoute>
          }
        />

        {/* ❌ Invalid route fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;