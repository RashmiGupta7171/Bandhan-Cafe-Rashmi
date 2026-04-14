
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Finance() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");

  // 🔐 Protect page + load data
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/");
    }
    fetchFinance();
  }, []);

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // 📥 Fetch data (SAFE)
  const fetchFinance = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/finance");

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setRecords([]);
    }
  };

  // ➕ Add finance
  const addFinance = async () => {
    if (!revenue || !expenses) return;

    const today = new Date().toLocaleDateString();
    const profit = Number(revenue) - Number(expenses);

    try {
      await fetch("http://localhost:5000/api/finance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: today,
          revenue: Number(revenue),
          expenses: Number(expenses),
          profit,
        }),
      });

      setRevenue("");
      setExpenses("");
      fetchFinance();
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ Delete
  const deleteRecord = async (id) => {
    if (!id) return;

    try {
      await fetch(`http://localhost:5000/api/finance/${id}`, {
        method: "DELETE",
      });

      fetchFinance();
    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 Prevent crash
  if (!Array.isArray(records)) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={styles.container}>
      
      {/* Top Bar */}
      <div style={styles.topBar}>
        <button style={styles.navBtn} onClick={() => navigate("/dashboard")}>
          ⬅ Back
        </button>
        <button style={styles.logoutBtn} onClick={logout}>
          🚪 Logout
        </button>
      </div>

      <h2 style={styles.heading}>Finance Management</h2>

      {/* Inputs */}
      <div style={styles.inputContainer}>
        <input
          type="number"
          placeholder="Daily Revenue"
          value={revenue}
          onChange={(e) => setRevenue(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Expenses"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Button */}
      <button style={styles.addBtn} onClick={addFinance}>
        Add Record
      </button>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Revenue</th>
            <th style={styles.th}>Expenses</th>
            <th style={styles.th}>Profit</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          ) : (
            records.map((rec, i) => (
              <tr key={rec?._id || i}>
                <td style={styles.td}>{i + 1}</td>
                <td style={styles.td}>{rec?.date || "-"}</td>
                <td style={styles.td}>₹{rec?.revenue || 0}</td>
                <td style={styles.td}>₹{rec?.expenses || 0}</td>
                <td style={{ ...styles.td, color: "green", fontWeight: "bold" }}>
                  ₹{rec?.profit || 0}
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteRecord(rec?._id)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  heading: {
    marginBottom: "20px",
  },
  inputContainer: {
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    margin: "5px",
    width: "200px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px 20px",
    background: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
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
  table: {
    width: "90%",
    margin: "30px auto",
    borderCollapse: "collapse",
  },
  th: {
    background: "#3498db",
    color: "#fff",
    padding: "10px",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  deleteBtn: {
    background: "red",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Finance;