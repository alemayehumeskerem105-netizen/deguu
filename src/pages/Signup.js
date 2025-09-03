// src/pages/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer"); // default role
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
    };

    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto-login after signup
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);

    // Redirect based on role
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSignup}
      style={{
        maxWidth: "300px",
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="farmer">Farmer</option>
        <option value="buyer">Buyer</option>
      </select>
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
        Signup
      </button>
    </form>
  );
}
