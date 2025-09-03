// src/pages/CropsPage.js
import React from 'react';

const crops = [
  { id: 1, name: 'Teff', price: 10 },
  { id: 2, name: 'Wheat', price: 8 },
  { id: 3, name: 'Barley', price: 7 },
];

export default function CropsPage() {
  return (
    <div className="category-page">
      <h2>Crops</h2>
      <div className="products-grid">
        {crops.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
