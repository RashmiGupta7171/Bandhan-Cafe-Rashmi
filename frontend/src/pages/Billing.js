// src/components/Billing.js
import React from "react";

function Billing({
  bill,
  changeQty,
  removeItem,
  grandTotal,
  cancelBill
}) {

  // 📊 Save data for charts
  const saveSalesData = () => {
    const existing = JSON.parse(localStorage.getItem("salesData")) || [];

    const today = new Date().toLocaleDateString("en-GB");

    const newData = bill.map(item => ({
      item: item.name,
      qty: item.qty,
      price: item.price,
      total: item.price * item.qty,
      date: today
    }));

    localStorage.setItem(
      "salesData",
      JSON.stringify([...existing, ...newData])
    );
  };

  // 🖨️ Print + Send Revenue
  const handlePrint = async () => {
    if (bill.length === 0) {
      alert("No items in bill ❗");
      return;
    }

    // ✅ 1. Save for charts
    saveSalesData();

    // ✅ 2. Send revenue to backend
    try {
      const today = new Date().toLocaleDateString("en-GB");

      await fetch("http://localhost:5000/api/finance/add-sale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: grandTotal,
          date: today,
        }),
      });

    } catch (err) {
      console.log("Revenue update error:", err);
    }

    // 🖨️ Print
    window.print();
  };

  return (
    <div className="billing">
      <h2>Billing</h2>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bill.map(item => (
            <tr key={item.key}>
              <td>{item.name} ({item.type})</td>

              <td>
                <button onClick={() => changeQty(item.key, -1)}>-</button>
                {item.qty}
                <button onClick={() => changeQty(item.key, 1)}>+</button>
              </td>

              <td>₹{item.price}</td>
              <td>₹{item.price * item.qty}</td>

              <td>
                <button onClick={() => removeItem(item.key)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">
        Grand Total: ₹{grandTotal}
      </div>

      <div className="actions">
        <button onClick={cancelBill}>Cancel Bill</button>
        <button onClick={handlePrint}>Print Bill</button>
      </div>
    </div>
  );
}

export default Billing;