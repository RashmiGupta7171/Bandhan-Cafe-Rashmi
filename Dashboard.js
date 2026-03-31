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