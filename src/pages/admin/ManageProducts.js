// src/pages/admin/ManageProducts.js
import React, { useState } from "react";

export default function ManageProducts() {
  // Dummy product data
  const [products, setProducts] = useState([
    { id: 1, name: "Teff", price: 50, stock: 100 },
    { id: 2, name: "Maize", price: 30, stock: 200 },
    { id: 3, name: "Wheat", price: 40, stock: 150 },
  ]);

  // Delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // Edit product (dummy prompt)
  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    const newName = prompt("Edit product name:", product.name);
    if (newName) {
      setProducts(
        products.map((p) =>
          p.id === id ? { ...p, name: newName } : p
        )
      );
    }
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", background: "#fff" }}>
        <thead style={{ background: "#232F3E", color: "#fff" }}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEdit(p.id)} style={{ marginRight: "10px" }}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No products available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
