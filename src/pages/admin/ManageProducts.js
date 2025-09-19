// src/pages/admin/ManageProducts.js
import React, { useEffect, useState } from "react";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Manage Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price} Birr{" "}
            <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 10, color: "red" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
