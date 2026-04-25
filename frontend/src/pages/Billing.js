// src/components/Billing.js
import React from "react";

function Billing({
  bill,
  changeQty,
  removeItem,
  grandTotal,
  cancelBill
}) {

  // ✅ SAVE DATA FOR CHARTS
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

  // 🖨️ PRINT BILL
  const handlePrint = () => {
    if (bill.length === 0) {
      alert("No items in bill ❗");
      return;
    }

    saveSalesData(); // 🔥 IMPORTANT (this makes charts work)
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

        {/* 🔥 UPDATED PRINT BUTTON */}
        <button onClick={handlePrint}>Print Bill</button>
      </div>
    </div>
  );
}

export default Billing;