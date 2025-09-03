// src/pages/admin/ManageUsers.js
import React, { useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", role: "farmer" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "buyer" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "buyer" },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleEdit = (id) => {
    const user = users.find((u) => u.id === id);
    const newName = prompt("Edit user name:", user.name);
    const newRole = prompt("Edit role (farmer/buyer/admin):", user.role);
    if (newName && newRole) {
      setUsers(users.map((u) => (u.id === id ? { ...u, name: newName, role: newRole } : u)));
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", background: "#fff" }}>
        <thead style={{ background: "#232F3E", color: "#fff" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleEdit(u.id)} style={{ marginRight: "10px" }}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No users available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
