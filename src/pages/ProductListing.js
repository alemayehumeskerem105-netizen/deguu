// src/pages/ProductListing.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductListing() {
  const [products, setProducts] = useState([]);

  // Mock data for now
  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        name: 'Teff',
        category: 'Grain',
        price: 1500,
        quantity: '100kg',
        farmer: 'Abebe',
        location: 'Oromia',
      },
      {
        id: 2,
        name: 'Coffee Beans',
        category: 'Export',
        price: 3200,
        quantity: '50kg',
        farmer: 'Aster',
        location: 'Sidama',
      },
      
    ];
    setProducts(sampleProducts);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Available Agricultural Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> {product.price} ETB</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Farmer:</strong> {product.farmer} ({product.location})</p>
            <div className="mt-3 flex gap-2">
              <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Contact</button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
