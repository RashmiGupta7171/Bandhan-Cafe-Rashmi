// ---------------- Finance ----------------
function addFinance() {
  const date = document.getElementById("date").value;
  const revenue = +document.getElementById("revenue").value;
  const expenses = +document.getElementById("expenses").value;

  if (!date || !revenue || !expenses) return alert("Fill all fields");

  const data = JSON.parse(localStorage.getItem("finance")) || [];
  data.push({ date, revenue, expenses });

  localStorage.setItem("finance", JSON.stringify(data));
  loadFinance();
}

function loadFinance() {
  const data = JSON.parse(localStorage.getItem("finance")) || [];
  const table = document.getElementById("financeTable");
  if (!table) return;

  table.innerHTML = "";

  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.date}</td>
        <td>₹${item.revenue}</td>
        <td>₹${item.expenses}</td>
        <td>₹${item.revenue - item.expenses}</td>
      </tr>`;
  });
}

// ---------------- Workers ----------------
function addWorker() {
  const name = document.getElementById("name").value;
  const salary = document.getElementById("salary").value;
  const daily = document.getElementById("daily").value;

  if (!name || !salary || !daily) return alert("Fill all fields");

  const data = JSON.parse(localStorage.getItem("workers")) || [];
  data.push({ name, salary, daily });

  localStorage.setItem("workers", JSON.stringify(data));
  loadWorkers();
}

function loadWorkers() {
  const data = JSON.parse(localStorage.getItem("workers")) || [];
  const table = document.getElementById("workerTable");
  if (!table) return;

  table.innerHTML = "";

  data.forEach(w => {
    table.innerHTML += `
      <tr>
        <td>${w.name}</td>
        <td>₹${w.salary}</td>
        <td>₹${w.daily}</td>
      </tr>`;
  });
}

// ---------------- Attendance ----------------
function addAttendance() {
  const name = document.getElementById("workerName").value;
  const date = document.getElementById("attDate").value;
  const status = document.getElementById("status").value;

  if (!name || !date) return alert("Fill all fields");

  const data = JSON.parse(localStorage.getItem("attendance")) || [];
  data.push({ name, date, status });

  localStorage.setItem("attendance", JSON.stringify(data));
  loadAttendance();
}

function loadAttendance() {
  const data = JSON.parse(localStorage.getItem("attendance")) || [];
  const table = document.getElementById("attendanceTable");
  if (!table) return;

  table.innerHTML = "";

  data.forEach(a => {
    table.innerHTML += `
      <tr>
        <td>${a.name}</td>
        <td>${a.date}</td>
        <td>${a.status}</td>
      </tr>`;
  });
}

// ---------------- Load All ----------------
window.onload = () => {
  loadFinance();
  loadWorkers();
  loadAttendance();
};