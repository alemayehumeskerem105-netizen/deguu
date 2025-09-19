// src/pages/admin/Overview.js
import React, { useEffect, useState } from "react";

export default function Overview() {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          fetch("http://localhost:5000/users"),
          fetch("http://localhost:5000/products"),
          fetch("http://localhost:5000/orders")
        ]);

        const users = await usersRes.json();
        const products = await productsRes.json();
        const orders = await ordersRes.json();

        setStats({ users: users.length, products: products.length, orders: orders.length });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2>📊 Overview</h2>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ padding: 20, background: "#fff", borderRadius: 8, flex: 1 }}>Users: {stats.users}</div>
        <div style={{ padding: 20, background: "#fff", borderRadius: 8, flex: 1 }}>Products: {stats.products}</div>
        <div style={{ padding: 20, background: "#fff", borderRadius: 8, flex: 1 }}>Orders: {stats.orders}</div>
      </div>
    </div>
  );
}
