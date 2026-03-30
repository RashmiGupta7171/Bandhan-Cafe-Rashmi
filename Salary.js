import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Salary() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [extra, setExtra] = useState("");

  // 🔐 protect + load data
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
    fetchSalary();
  }, [navigate]);

  // ✅ fetch data
  const fetchSalary = async () => {
    const res = await fetch("http://localhost:5000/api/salary");
    const data = await res.json();
    setRecords(data);
  };

  // ✅ add record
  const addRecord = async () => {
    if (!name || !salary) {
      alert("Enter all fields");
      return;
    }

    const today = new Date().toLocaleDateString();
    const finalSalary = salary - (extra || 0);

    await fetch("http://localhost:5000/api/salary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: today,
        name,
        salary,
        extra,
        final: finalSalary,
      }),
    });

    alert("Salary saved ✅");

    setName("");
    setSalary("");
    setExtra("");

    fetchSalary();
  };

  // ❌ delete record
  const deleteRecord = async (id) => {
    await fetch(`http://localhost:5000/api/salary/${id}`, {
      method: "DELETE",
    });

    alert("Deleted successfully ❌");
    fetchSalary();
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <button onClick={() => navigate("/dashboard")}>⬅ Back</button>
      <button onClick={logout}>🚪 Logout</button>

      <h2>Salary Management</h2>

      <input
        placeholder="Worker Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />

      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />

      <input
        type="number"
        placeholder="Extra (Advance)"
        value={extra}
        onChange={(e) => setExtra(e.target.value)}
        style={{ margin: "5px", padding: "8px" }}
      />

      <br />

      <button onClick={addRecord} style={{ marginTop: "10px" }}>
        Add Record
      </button>

      <br /><br />

      <table border="1" style={{ margin: "auto", width: "90%" }}>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Date</th>
            <th>Worker Name</th>
            <th>Salary (₹)</th>
            <th>Extra Given (₹)</th>
            <th>Final Salary (₹)</th>
            <th>Action</th> {/* ✅ new column */}
          </tr>
        </thead>

        <tbody>
          {records.map((rec, index) => (
            <tr key={rec._id}> {/* ✅ important */}
              <td>{index + 1}</td>
              <td>{rec.date}</td>
              <td>{rec.name}</td>
              <td>₹{rec.salary}</td>
              <td style={{ color: "red" }}>₹{rec.extra}</td>
              <td style={{ color: "green" }}>₹{rec.final}</td>

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

export default Salary;