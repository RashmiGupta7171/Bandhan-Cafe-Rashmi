import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBill, FaUserCheck } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.topBar}>
        <button onClick={() => navigate("/")}>⬅ Login Page</button>
        <button onClick={logout}>🚪 Logout</button>
      </div>

      <h1 style={styles.title}>Bandhan Cafe</h1>
      <p style={styles.subtitle}>Management Dashboard</p>

      <div style={styles.cardContainer}>
        
        <div style={styles.card} onClick={() => navigate("/salary")}>
          <FaMoneyBill size={40} />
          <h2>Salary</h2>
        </div>

        <div style={styles.card} onClick={() => navigate("/attendance")}>
          <FaUserCheck size={40} />
          <h2>Attendance</h2>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
  },
  title: {
    fontSize: "40px",
  },
  subtitle: {
    color: "gray",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "50px",
  },
  card: {
    width: "200px",
    height: "150px",
    background: "#f5f5f5",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};

export default Dashboard;