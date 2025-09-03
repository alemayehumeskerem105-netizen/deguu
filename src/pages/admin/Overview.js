// src/pages/admin/Overview.js
import React, { useState } from "react";

// Dummy initial data
const initialUsers = [
  { id: 1, name: "Alice", role: "farmer", lastLogin: "2025-09-01" },
  { id: 2, name: "Bob", role: "buyer", lastLogin: "2025-09-02" },
  { id: 3, name: "Charlie", role: "buyer", lastLogin: "2025-09-02" },
];

const initialProducts = [
  { id: 1, name: "Teff", sold: 50 },
  { id: 2, name: "Maize", sold: 30 },
  { id: 3, name: "Wheat", sold: 20 },
];

const initialOrders = [
  { id: 101, product: "Teff", buyer: "Bob", status: "Pending", date: "2025-09-01" },
  { id: 102, product: "Maize", buyer: "Charlie", status: "Shipped", date: "2025-09-01" },
  { id: 103, product: "Wheat", buyer: "Alice", status: "Delivered", date: "2025-09-02" },
];

export default function Overview() {
  const [users, setUsers] = useState(initialUsers);
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);

  // Delete handlers
  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));
  const deleteProduct = (id) => setProducts(products.filter((p) => p.id !== id));
  const deleteOrder = (id) => setOrders(orders.filter((o) => o.id !== id));

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    flex: 1,
    margin: "10px",
    textAlign: "center",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const thStyle = { background: "#232F3E", color: "#fff", padding: "10px", textAlign: "left" };
  const tdStyle = { padding: "10px", borderBottom: "1px solid #ddd" };
  const deleteBtn = { background: "red", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" };

  return (
    <div>
      <h2>Admin Overview</h2>

      {/* Stats Cards */}
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{users.length}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Products</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{products.length}</p>
        </div>
        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{orders.length}</p>
        </div>
      </div>

      {/* Latest Orders */}
      <h3 style={{ marginTop: "40px" }}>Latest Orders</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Buyer</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td style={tdStyle}>{o.id}</td>
              <td style={tdStyle}>{o.product}</td>
              <td style={tdStyle}>{o.buyer}</td>
              <td style={tdStyle}>{o.status}</td>
              <td style={tdStyle}>{o.date}</td>
              <td style={tdStyle}><button style={deleteBtn} onClick={() => deleteOrder(o.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Top Products */}
      <h3 style={{ marginTop: "40px" }}>Top Products</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Units Sold</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td style={tdStyle}>{p.name}</td>
              <td style={tdStyle}>{p.sold}</td>
              <td style={tdStyle}><button style={deleteBtn} onClick={() => deleteProduct(p.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Recent Users */}
      <h3 style={{ marginTop: "40px" }}>Recent Users</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Last Login</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td style={tdStyle}>{u.name}</td>
              <td style={tdStyle}>{u.role}</td>
              <td style={tdStyle}>{u.lastLogin}</td>
              <td style={tdStyle}><button style={deleteBtn} onClick={() => deleteUser(u.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
