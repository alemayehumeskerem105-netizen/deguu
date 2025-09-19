// src/pages/admin/ManageOrders.js
import React, { useEffect, useState } from "react";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Manage Orders</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            {o.productName} - {o.buyerName} - {o.status}{" "}
            {o.status !== "Delivered" && (
              <button onClick={() => updateStatus(o.id, "Delivered")} style={{ marginLeft: 10 }}>
                Mark Delivered
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
