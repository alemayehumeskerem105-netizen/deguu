import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const farmer = JSON.parse(localStorage.getItem('user')); // Assume { _id, role }

  useEffect(() => {
    if (!farmer || farmer.role !== 'farmer') return;

    fetch(`http://localhost:5000/api/products?farmerId=${farmer._id}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, [farmer]);

  if (!farmer) return <p>Please log in first</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🌾 My Products</h2>

      {products.length === 0 ? (
        <p>You have no products yet.</p>
      ) : (
        <ul className="space-y-4">
          {products.map(p => (
            <li key={p._id} className="border p-4 rounded-md flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p>{p.description}</p>
                <p className="text-green-700">Price: ${p.price}</p>
              </div>
              <Link to={`/edit-product/${p._id}`}>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
