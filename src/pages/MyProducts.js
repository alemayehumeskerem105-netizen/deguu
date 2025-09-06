import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadProducts, deleteProduct } from "../mockData";

export default function MyProducts() {
  const [myProducts, setMyProducts] = useState([]);

  const loadMyProducts = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    const filtered = loadProducts().filter((p) => p.farmerId === user.id);
    setMyProducts(filtered);
  };

  useEffect(() => {
    loadMyProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteProduct(id);
      loadMyProducts(); // Refresh after deletion
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🌾 My Products</h2>
      {myProducts.length === 0 ? (
        <p>No products yet. Add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myProducts.map((p) => (
            <div key={p.id} className="border rounded p-3 flex flex-col items-center">
              {p.image && <img src={p.image} alt={p.name} className="w-32 h-32 object-cover rounded mb-2" />}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-green-700 font-semibold mb-1">${p.price}</p>
              {p.description && <p className="text-gray-600 text-sm text-center">{p.description}</p>}
              <div className="flex space-x-2 mt-2">
                <Link to={`/edit-product/${p.id}`} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</Link>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
