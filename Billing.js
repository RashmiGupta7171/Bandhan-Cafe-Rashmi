// src/components/Billing.js
import React from "react";

function Billing({
  bill,
  changeQty,
  removeItem,
  grandTotal,
  cancelBill,
  printBill
}) {
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

              <td>{item.price}</td>
              <td>{item.price * item.qty}</td>

              <td>
                <button onClick={() => removeItem(item.key)}>X</button>
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
        <button onClick={printBill}>Print Bill</button>
      </div>
     
    </div>
  );
}

export default Billing;