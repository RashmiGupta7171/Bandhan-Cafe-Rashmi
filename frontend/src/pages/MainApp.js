import React, { useState } from "react";
import Menu from "./Menu";
import Billing from "./Billing";
import { menuData } from "../data";
import "../App.css";

function MainApp() {
  const [bill, setBill] = useState([]);

  // ✅ ADD ITEM
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

  // ✅ CHANGE QUANTITY
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

  // ✅ REMOVE ITEM
  const removeItem = (key) => {
    setBill(bill.filter(item => item.key !== key));
  };

  // ✅ CANCEL BILL
  const cancelBill = () => {
    setBill([]);
  };

  // ✅ GRAND TOTAL
  const grandTotal = bill.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ✅ SAVE SALES DATA (IMPORTANT)
  const saveSalesData = () => {
    let sales = JSON.parse(localStorage.getItem("salesData")) || [];

    // ⭐ IMPORTANT: correct date format
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

  // ✅ PRINT BILL
  const printBill = () => {
    saveSalesData();   // ⭐ MUST
    window.print();
  };

  return (
    <div>
      <h1>Bandhan Cafe</h1>

      <div className="container">
        {/* 🍽️ MENU */}
        <Menu menuData={menuData} addItem={addItem} />

        {/* 🧾 BILLING */}
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