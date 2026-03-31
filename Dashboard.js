<<<<<<< HEAD
import { useEffect, useState } from "react";
import API from "./api";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const fetchData = async () => {
    const res = await API.get("/finance");
    setData(res.data);
  };

  const add = async () => {
    await API.post("/finance", form);
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <h2>Finance</h2>

      <input type="date" onChange={e => setForm({...form, date:e.target.value})}/>
      <input placeholder="Revenue" onChange={e => setForm({...form, revenue:e.target.value})}/>
      <input placeholder="Expenses" onChange={e => setForm({...form, expenses:e.target.value})}/>

      <button onClick={add}>Add</button>

      {data.map(d => (
        <div key={d._id}>
          {d.date} ₹{d.revenue} ₹{d.expenses}
        </div>
      ))}
    </div>
  );
}
=======
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBill, FaUserCheck, FaChartLine } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  // 🔐 Protect page
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
      
      {/* Top Bar */}
      <div style={styles.topBar}>
        <button style={styles.navBtn} onClick={() => navigate("/")}>
          ⬅ Login Page
        </button>
        <button style={styles.logoutBtn} onClick={logout}>
          🚪 Logout
        </button>
      </div>

      {/* Title */}
      <h1 style={styles.title}>☕ Bandhan Cafe</h1>
      <p style={styles.subtitle}>Management Dashboard</p>

      {/* Cards */}
      <div style={styles.cardContainer}>

        {/* Salary */}
        <div
          style={styles.card}
          onClick={() => navigate("/salary")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaMoneyBill size={60} color="#3498db" />
          <h2>Salary</h2>
        </div>

        {/* Attendance */}
        <div
          style={styles.card}
          onClick={() => navigate("/attendance")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaUserCheck size={60} color="#e67e22" />
          <h2>Attendance</h2>
        </div>

        {/* Finance */}
        <div
          style={styles.card}
          onClick={() => navigate("/finance")}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FaChartLine size={60} color="#2ecc71" />
          <h2>Finance</h2>
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
>>>>>>> 0debc6106beeb2298db58b4673b6a68625b879dd
