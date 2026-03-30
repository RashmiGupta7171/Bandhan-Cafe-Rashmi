import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Finance() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");

  useEffect(() => {
    fetchFinance();
  }, []);

  const fetchFinance = async () => {
    const res = await fetch("http://localhost:5000/api/finance");
    const data = await res.json();
    setRecords(data);
  };

  const addFinance = async () => {
    if (!revenue || !expenses) return;

    const today = new Date().toLocaleDateString();
    const profit = revenue - expenses;

    await fetch("http://localhost:5000/api/finance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: today,
        revenue,
        expenses,
        profit,
      }),
    });

    setRevenue("");
    setExpenses("");
    fetchFinance();
  };

  const deleteRecord = async (id) => {
    await fetch(`http://localhost:5000/api/finance/${id}`, {
      method: "DELETE",
    });
    fetchFinance();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <button onClick={() => navigate("/dashboard")}>⬅ Back</button>

      <h2>Finance Management</h2>

      <input
        type="number"
        placeholder="Daily Revenue"
        value={revenue}
        onChange={(e) => setRevenue(e.target.value)}
      />

      <input
        type="number"
        placeholder="Expenses"
        value={expenses}
        onChange={(e) => setExpenses(e.target.value)}
      />

      <br /><br />

      <button onClick={addFinance}>Add</button>

      <br /><br />

      <table border="1" style={{ margin: "auto", width: "80%" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Revenue</th>
            <th>Expenses</th>
            <th>Profit</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec, i) => (
            <tr key={rec._id}>
              <td>{i + 1}</td>
              <td>{rec.date}</td>
              <td>₹{rec.revenue}</td>
              <td>₹{rec.expenses}</td>
              <td style={{ color: "green" }}>₹{rec.profit}</td>
              <td>
                <button onClick={() => deleteRecord(rec._id)}>
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Finance;