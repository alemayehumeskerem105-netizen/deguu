// src/pages/admin/AdminDashboard.js
import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Overview from "./Overview";
import ManageUsers from "./ManageUsers";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";

export default function AdminDashboard() {
  const linkStyle = { color: "#fff", display: "block", padding: "10px 15px", textDecoration: "none", marginBottom: "5px" };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: "260px", background: "#232F3E", color: "#fff", padding: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>Agri Admin</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="" style={linkStyle}>Overview</Link></li>
            <li><Link to="users" style={linkStyle}>Manage Users</Link></li>
            <li><Link to="products" style={linkStyle}>Manage Products</Link></li>
            <li><Link to="orders" style={linkStyle}>Manage Orders</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, background: "#F3F3F3", padding: "20px", overflowY: "auto" }}>
        <Routes>
          <Route path="" element={<Overview />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </main>
    </div>
  );
}
