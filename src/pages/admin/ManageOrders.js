
// src/pages/admin/ManageOrders.js
import React, { useState } from "react";

export default function ManageOrders() {
  const [orders, setOrders] = useState([
    { id: 1, product: "Teff", quantity: 10, buyer: "Bob", status: "Pending" },
    { id: 2, product: "Maize", quantity: 5, buyer: "Charlie", status: "Shipped" },
    { id: 3, product: "Wheat", quantity: 20, buyer: "Alice", status: "Delivered" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  const handleEdit = (id) => {
    const order = orders.find((o) => o.id === id);
    const newStatus = prompt("Edit order status (Pending/Shipped/Delivered):", order.status);
    if (newStatus) {
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    }
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", background: "#fff" }}>
        <thead style={{ background: "#232F3E", color: "#fff" }}>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Buyer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.product}</td>
              <td>{o.quantity}</td>
              <td>{o.buyer}</td>
              <td>{o.status}</td>
              <td>
                <button onClick={() => handleEdit(o.id)} style={{ marginRight: "10px" }}>Edit</button>
                <button onClick={() => handleDelete(o.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No orders available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
