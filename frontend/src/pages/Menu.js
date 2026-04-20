// src/components/Menu.js
import React, { useState } from "react";

function Menu({ menuData, addItem }) {
  const [search, setSearch] = useState("");

  return (
    <div className="menu">
      <h2>Menu</h2>

      <input
        type="search"
        placeholder="Search item..."
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {Object.entries(menuData).map(([category, items]) => {
        const filtered = items.filter(item =>
          item.name.toLowerCase().includes(search)
        );

        if (!filtered.length) return null;

        return (
          <div key={category} className="menu-category">
            <div className="menu-title-row">
              <h3>{category}</h3>
              <div className="title-prices">
                <span>Half</span>
                <span>Full</span>
              </div>
            </div>

            {filtered.map((item, i) => (
              <div key={i} className="menu-row">
                <div className="col-item">
                  {i + 1}. {item.name}
                </div>

                <div className="col-half">
                  {item.half ? (
                    <button onClick={() =>
                      addItem(item.name, item.half, "half")
                    }>
                      {item.half}
                    </button>
                  ) : "-"}
                </div>

                <div className="col-full">
                  <button onClick={() =>
                    addItem(item.name, item.full, "full")
                  }>
                    {item.full}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Menu;