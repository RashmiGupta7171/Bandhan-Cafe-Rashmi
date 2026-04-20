import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";

function Charts() {
  const [data, setData] = useState([]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

  useEffect(() => {
    const stored = localStorage.getItem("salesData");
    const sales = stored ? JSON.parse(stored) : [];

    // ✅ Get today's date (same format as saved)
    const today = new Date().toLocaleDateString("en-GB");

    // ✅ Filter today's data
    const todaySales = sales.filter(s => s.date === today);

    // ✅ Group by item
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
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Today’s Sales Dashboard</h1>

      {data.length === 0 ? (
        <p>No sales today. Please create a bill first.</p>
      ) : (
        <>
          {/* 📊 BAR CHART */}
          <h3>Items Sold Today</h3>
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="qty" />
          </BarChart>

          {/* 🥧 PIE CHART */}
          <h3>Sales Ratio</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              dataKey="qty"
              nameKey="name"
              outerRadius={100}
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

export default Charts;