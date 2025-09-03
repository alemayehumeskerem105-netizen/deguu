// src/pages/LivestockPage.js
import React from 'react';

const livestock = [
  { id: 1, name: 'Cow', price: 100 },
  { id: 2, name: 'Goat', price: 50 },
  { id: 3, name: 'Sheep', price: 60 },
];

export default function LivestockPage() {
  return (
    <div className="category-page">
      <h2>Livestock</h2>
      <div className="products-grid">
        {livestock.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
