// src/pages/VegetablesPage.js
import React from 'react';

const vegetables = [
  { id: 1, name: 'Tomato', price: 2 },
  { id: 2, name: 'Cabbage', price: 3 },
  { id: 3, name: 'Carrot', price: 2.5 },
];

export default function VegetablesPage() {
  return (
    <div className="category-page">
      <h2>Vegetables</h2>
      <div className="products-grid">
        {vegetables.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
