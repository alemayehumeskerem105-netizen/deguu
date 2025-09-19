import React, { useState } from "react";
import ProductCard from "../component/ProductCard";
import productsData from "../data/product"; // 👈 import local products.js

export default function Marketplace({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products by search term
  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Marketplace</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px 12px",
          width: "100%",
          maxWidth: 400,
          marginBottom: 20,
          fontSize: 16,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      {/* Product List */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
