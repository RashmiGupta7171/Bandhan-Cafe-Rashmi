import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Attendance() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");

  const markAttendance = (status) => {
    if (!name) {
      alert("Enter worker name");
      return;
    }

    const today = new Date().toLocaleDateString();

    setRecords([
      ...records,
      { date: today, name: name, status: status },
    ]);

    setName("");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      
      <button onClick={() => navigate("/dashboard")}>⬅ Back</button>

      <h2>Attendance Sheet</h2>

      <input
        placeholder="Worker Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />

      <button onClick={() => markAttendance("Present")} style={{ marginRight: "10px" }}>
        ✅ Present
      </button>

      <button onClick={() => markAttendance("Absent")}>
        ❌ Absent
      </button>

      <br /><br />

      <table border="1" style={{ margin: "auto", width: "70%" }}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Date</th>
            <th>Worker Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{rec.date}</td>
              <td>{rec.name}</td>
              <td style={{ color: rec.status === "Present" ? "green" : "red" }}>
                {rec.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Attendance;