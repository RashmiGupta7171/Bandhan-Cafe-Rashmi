import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBill, FaUserCheck, FaChartLine } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      
      {/* Top Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px" }}>
        <button onClick={() => navigate("/")}>⬅ Login Page</button>
        <button onClick={logout}>🚪 Logout</button>
      </div>

      <h1>Bandhan Cafe</h1>
      <p>Management Dashboard</p>

      {/* Cards */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        marginTop: "40px"
      }}>

        {/* Salary */}
        <div
          style={cardStyle}
          onClick={() => navigate("/salary")}
        >
          <FaMoneyBill size={40} />
          <h2>Salary</h2>
        </div>

        {/* Attendance */}
        <div
          style={cardStyle}
          onClick={() => navigate("/attendance")}
        >
          <FaUserCheck size={40} />
          <h2>Attendance</h2>
        </div>

        {/* Finance */}
        <div
          style={cardStyle}
          onClick={() => navigate("/finance")}
        >
          <FaChartLine size={40} color="#2ecc71" />
          <h2>Finance</h2>
        </div>

      </div>
    </div>
  );
}

// ✅ Card Style
const cardStyle = {
  width: "200px",
  height: "150px",
  background: "#ffffff",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
  transition: "0.3s",
};

export default Dashboard;