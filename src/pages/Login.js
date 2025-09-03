// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Static admin login
    if (email === "admin@example.com" && password === "admin123") {
      const adminUser = { id: 1, name: "Admin", role: "admin" };
      localStorage.setItem("user", JSON.stringify(adminUser));
      setUser(adminUser);
      navigate("/admin");
      return;
    }

    // ✅ Dynamic user login (farmer/buyer)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/dashboard"); // Farmer or Buyer dashboard
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        maxWidth: "300px",
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#232F3E",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Login
      </button>
    </form>
  );
}
