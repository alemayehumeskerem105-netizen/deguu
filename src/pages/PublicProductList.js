// src/pages/PublicProductList.jsx
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function PublicProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allProducts = [];
      snapshot.forEach((doc) => {
        allProducts.push({ id: doc.id, ...doc.data() });
      });
      setProducts(allProducts);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛍️ Available Agricultural Products</h2>

      {products.length === 0 ? (
        <p>No products available currently.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> {product.price} ETB</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Location:</strong> {product.location}</p>
              <p><strong>Farmer:</strong> {product.farmerName || 'Unknown'}</p>
              <div className="mt-3 flex gap-2">
                <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                  Contact Farmer
                </button>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                  Place Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
