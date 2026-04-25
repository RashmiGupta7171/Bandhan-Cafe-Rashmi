import React, { useState } from "react";
import Menu from "./Menu";
import Billing from "./Billing";
import { menuData } from "../data";
import "../App.css";

function MainApp() {
  const [bill, setBill] = useState([]);

  const addItem = (name, price, type) => {
    const key = name + "-" + type;

    const existing = bill.find(item => item.key === key);

    if (existing) {
      setBill(
        bill.map(item =>
          item.key === key
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setBill([
        ...bill,
        { key, name, price, type, qty: 1 }
      ]);
    }
  };

  const changeQty = (key, step) => {
    setBill(
      bill
        .map(item =>
          item.key === key
            ? { ...item, qty: item.qty + step }
            : item
        )
        .filter(item => item.qty > 0)
    );
  };

  const removeItem = (key) => {
    setBill(bill.filter(item => item.key !== key));
  };

  const cancelBill = () => setBill([]);

  const grandTotal = bill.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ✅ SAVE SALES (for charts)
  const saveSalesData = () => {
    let sales = JSON.parse(localStorage.getItem("salesData")) || [];
    const today = new Date().toLocaleDateString("en-GB");

    bill.forEach(item => {
      sales.push({
        item: item.name + " (" + item.type + ")",
        qty: item.qty,
        date: today
      });
    });

    localStorage.setItem("salesData", JSON.stringify(sales));
  };

  // 🔥 SEND REVENUE TO BACKEND
  const sendRevenueToBackend = async () => {
    const totalAmount = grandTotal;
    const today = new Date().toLocaleDateString("en-GB");

    try {
      await fetch("http://localhost:5000/api/finance/add-sale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: totalAmount,
          date: today
        })
      });
    } catch (err) {
      console.log("Error sending revenue:", err);
    }
  };

  const printBill = async () => {
    saveSalesData();
    await sendRevenueToBackend(); // 🔥 CONNECTED
    window.print();
  };

  return (
    <div>
      <h1>Bandhan Wine & Dine</h1>

      <div className="container">
        <Menu menuData={menuData} addItem={addItem} />

        <Billing
          bill={bill}
          changeQty={changeQty}
          removeItem={removeItem}
          grandTotal={grandTotal}
          cancelBill={cancelBill}
          printBill={printBill}
        />
      </div>
    </div>
  );
}

export default MainApp;