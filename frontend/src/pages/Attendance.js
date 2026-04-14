/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Attendance() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");

  // 🔐 Protect page + load data
  
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/");
    }
    fetchAttendance();
  }, []);

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // 📥 Fetch data (SAFE)
  const fetchAttendance = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/attendance");

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      setRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Error:", error);
      setRecords([]);
    }
  };

  // ➕ Add attendance
  const markAttendance = async (status) => {
    if (!name) return;

    try {
      await fetch("http://localhost:5000/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date().toLocaleDateString(),
          name,
          status,
        }),
      });

      setName("");
      fetchAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  // ❌ Delete
  const deleteRecord = async (id) => {
    if (!id) return;

    try {
      await fetch(`http://localhost:5000/api/attendance/${id}`, {
        method: "DELETE",
      });

      fetchAttendance();
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

      <h2 style={styles.heading}>Attendance Management</h2>

      {/* Input */}
      <input
        placeholder="Worker Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        onKeyDown={(e) => e.key === "Enter" && markAttendance("Present")}
      />

      {/* Buttons */}
      <div style={styles.buttonGroup}>
        <button style={styles.presentBtn} onClick={() => markAttendance("Present")}>
          Present
        </button>
        <button style={styles.absentBtn} onClick={() => markAttendance("Absent")}>
          Absent
        </button>
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="5">No records found</td>
            </tr>
          ) : (
            records.map((r, i) => (
              <tr key={r?._id || i}>
                <td style={styles.td}>{i + 1}</td>
                <td style={styles.td}>{r?.date || "-"}</td>
                <td style={styles.td}>{r?.name || "-"}</td>
                <td
                  style={{
                    ...styles.td,
                    color: r?.status === "Present" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {r?.status || "-"}
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteRecord(r?._id)}
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
  input: {
    padding: "10px",
    width: "250px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    margin: "10px 0",
  },
  presentBtn: {
    margin: "5px",
    padding: "10px 20px",
    background: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  absentBtn: {
    margin: "5px",
    padding: "10px 20px",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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

export default Attendance;