import React, { useState } from "react";
import { Link } from "react-router-dom";
import { farmers, products, orders } from "../mockData";

export default function FarmerList() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const placeOrder = () => {
    if (cart.length === 0) return alert("Add products to cart first!");
    orders.push(...cart);
    setCart([]);
    alert("Order placed successfully!");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Farmers & Products</h2>

      {farmers.map((f) => {
        const farmerProducts = products.filter((p) => p.farmerId === f.id);
        return (
          <div key={f.id} className="border p-4 rounded mb-4">
            <div className="flex items-center mb-2">
              {f.image && (
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-16 h-16 rounded mr-2"
                />
              )}
              <h3 className="text-xl font-bold">{f.name}</h3>
            </div>
            <p className="mb-2">{f.bio}</p>

            <div className="grid grid-cols-2 gap-4">
              {farmerProducts.map((p) => (
                <div key={p.id} className="border p-2 rounded">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-24 object-cover mb-2"
                  />
                  <h4 className="font-bold">{p.name}</h4>
                  <p>${p.price}</p>
                  <button
                    onClick={() => addToCart(p)}
                    className="px-2 py-1 bg-green-600 text-white rounded mt-1"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border p-4 rounded shadow">
          <h3 className="font-bold mb-2">Cart: {cart.length} items</h3>
          <ul className="mb-2">
            {cart.map((p, i) => (
              <li key={i}>
                {p.name} - ${p.price}
              </li>
            ))}
          </ul>
          <button
            onClick={placeOrder}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
