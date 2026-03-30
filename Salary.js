import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Salary() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [extra, setExtra] = useState("");

  // 🔐 Protect page + load data
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/");
    }
    fetchSalary();
  }, []);

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // 📥 Fetch data (SAFE)
  const fetchSalary = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/salary");

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setRecords([]);
    }
  };

  // ➕ Add record
  const addRecord = async () => {
    if (!name || !salary) return;

    const today = new Date().toLocaleDateString();
    const finalSalary = Number(salary) - Number(extra || 0);

    try {
      await fetch("http://localhost:5000/api/salary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: today,
          name,
          salary: Number(salary),
          extra: Number(extra || 0),
          final: finalSalary,
        }),
      });

      setName("");
      setSalary("");
      setExtra("");

      fetchSalary();
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ Delete record
  const deleteRecord = async (id) => {
    if (!id) return;

    try {
      await fetch(`http://localhost:5000/api/salary/${id}`, {
        method: "DELETE",
      });

      fetchSalary();
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

      <h2 style={styles.heading}>Salary Management</h2>

      {/* Inputs */}
      <div style={styles.inputContainer}>
        <input
          placeholder="Worker Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Extra (Advance)"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && addRecord()}
        />
      </div>

      {/* Button */}
      <button style={styles.addBtn} onClick={addRecord}>
        Add Record
      </button>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Salary</th>
            <th style={styles.th}>Extra</th>
            <th style={styles.th}>Final</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          ) : (
            records.map((rec, index) => (
              <tr key={rec?._id || index}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{rec?.date || "-"}</td>
                <td style={styles.td}>{rec?.name || "-"}</td>
                <td style={styles.td}>₹{rec?.salary || 0}</td>
                <td style={{ ...styles.td, color: "red" }}>
                  ₹{rec?.extra || 0}
                </td>
                <td style={{ ...styles.td, color: "green", fontWeight: "bold" }}>
                  ₹{rec?.final || 0}
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

export default Salary;