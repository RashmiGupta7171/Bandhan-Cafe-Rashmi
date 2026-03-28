import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Salary() {
  const navigate = useNavigate();
  const logout = ( ) => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  useEffect(() =>{
    if(!localStorage.getItem("isLoggedIn")){
        navigate("/");
    }
  } , []);

  const [records, setRecords] = useState([]);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [extra, setExtra] = useState("");

  const addRecord = () => {
    if (!name || !salary) {
      alert("Please enter all required fields");
      return;
    }

    const today = new Date().toLocaleDateString();

    const finalSalary = salary - (extra || 0);

    const newRecord = {
      date: today,
      name,
      salary: Number(salary),
      extra: Number(extra || 0),
      final: finalSalary,
    };

    setRecords([...records, newRecord]);

    // clear inputs
    setName("");
    setSalary("");
    setExtra("");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      
      <button onClick={() => navigate("/dashboard")}>⬅ Back</button>
       <button onClick={logout}> Logout</button>
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
          </tr>
        </thead>

        <tbody>
          {records.map((rec, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{rec.date}</td>
              <td>{rec.name}</td>
              <td>₹{rec.salary}</td>
              <td style={{ color: "red" }}>₹{rec.extra}</td>
              <td style={{ color: "green" }}>₹{rec.final}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Salary;