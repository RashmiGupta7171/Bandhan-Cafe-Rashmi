import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMoneyBill,
  FaUserCheck,
  FaChartLine,
  FaUtensils
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  // 🔐 Protect page (login check)
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/");
    }
  }, [navigate]);

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      
      {/* 🔝 Top Bar */}
      <div style={styles.topBar}>
        <button style={styles.navBtn} onClick={() => navigate("/")}>
          ⬅ Login Page
        </button>
        <button style={styles.logoutBtn} onClick={logout}>
          🚪 Logout
        </button>
      </div>

      {/* 🏷 Title */}
      <h1 style={styles.title}>☕ Bandhan Cafe</h1>
      <p style={styles.subtitle}>Management Dashboard</p>

      {/* 📦 Cards Section */}
      <div style={styles.cardContainer}>

        {/* 💰 Salary */}
        <div style={styles.card} onClick={() => navigate("/salary")}>
          <FaMoneyBill size={60} color="#3498db" />
          <h2>Salary</h2>
        </div>

        {/* 📅 Attendance */}
        <div style={styles.card} onClick={() => navigate("/attendance")}>
          <FaUserCheck size={60} color="#e67e22" />
          <h2>Attendance</h2>
        </div>

        {/* 📊 Finance */}
        <div style={styles.card} onClick={() => navigate("/finance")}>
          <FaChartLine size={60} color="#2ecc71" />
          <h2>Finance</h2>
        </div>

        {/* 🍽️ Menu / Billing */}
        <div style={styles.card} onClick={() => navigate("/billing")}>
          <FaUtensils size={60} color="#9b59b6" />
          <h2>Menu</h2>
        </div>

        {/* 📈 Charts */}
        <div style={styles.card} onClick={() => navigate("/charts")}>
          <FaChartLine size={60} color="#e74c3c" />
          <h2>Charts</h2>
        </div>

      </div>
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
  },

  navBtn: {
    padding: "8px 15px",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "8px 15px",
    background: "#333",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  title: {
    marginTop: "20px",
  },

  subtitle: {
    color: "gray",
  },

  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "40px",
    marginTop: "50px",
  },

  card: {
    width: "220px",
    height: "160px",
    background: "#fff",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
    transition: "0.3s",
  },
};

export default Dashboard;