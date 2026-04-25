import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend
} from "recharts";

function Charts() {
  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/");
};
  const [data, setData] = useState([]);
  const [topItem, setTopItem] = useState(null);

  // 🎨 Colors for charts
  const COLORS = [
    "#3498db", "#2ecc71", "#f1c40f",
    "#e74c3c", "#9b59b6", "#1abc9c"
  ];

  // 📊 Load data
  const loadData = () => {
    const stored = localStorage.getItem("salesData");
    const sales = stored ? JSON.parse(stored) : [];

    const today = new Date().toLocaleDateString("en-GB");

    // 👉 Filter today's sales
    const todaySales = sales.filter(s => s.date === today);

    // 👉 Group by item
    const grouped = {};
    todaySales.forEach(s => {
      if (!grouped[s.item]) {
        grouped[s.item] = 0;
      }
      grouped[s.item] += s.qty;
    });

    const formatted = Object.keys(grouped).map(key => ({
      name: key,
      qty: grouped[key]
    }));

    setData(formatted);

    // 🔥 Find top selling item
    if (formatted.length > 0) {
      const top = formatted.reduce((a, b) => (a.qty > b.qty ? a : b));
      setTopItem(top);
    }
  };

  useEffect(() => {
    loadData();

    // 🔁 Auto refresh every 3 seconds
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
  <button onClick={() => navigate("/dashboard")}>⬅ Back</button>
  <button onClick={logout}>🚪 Logout</button>
</div>
      <h1>📊 Today’s Sales Dashboard</h1>

      {data.length === 0 ? (
        <p style={{ color: "gray" }}>
          No sales today. Create a bill first 🧾
        </p>
      ) : (
        <>
          {/* 🔥 TOP ITEM */}
          {topItem && (
            <div style={styles.topCard}>
              🔥 Top Selling Item: <b>{topItem.name}</b> ({topItem.qty})
            </div>
          )}

          {/* 📊 BAR CHART */}
          <h3>Items Sold Today</h3>
          <BarChart width={700} height={350} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="qty">
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>

          {/* 🥧 PIE CHART */}
          <h3>Sales Distribution</h3>
          <PieChart width={450} height={350}>
            <Pie
              data={data}
              dataKey="qty"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </>
      )}
    </div>
  );
}

// 🎨 STYLES
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  topCard: {
    background: "#ffeaa7",
    padding: "15px",
    margin: "20px auto",
    width: "300px",
    borderRadius: "10px",
    fontSize: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
};

export default Charts;