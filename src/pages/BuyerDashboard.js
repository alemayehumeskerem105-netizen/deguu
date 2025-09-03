import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "buyer") {
      navigate("/login"); // redirect if not logged in or not a buyer
    } else {
      setBuyer(storedUser);
    }
  }, [navigate]);

  if (!buyer) return null; // Prevent flash before redirect

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Welcome, {buyer.name} 🛍️
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/marketplace">
          <button className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded shadow">
            🛒 Browse Marketplace
          </button>
        </Link>

        <Link to="/cart">
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded shadow">
            🛍️ My Cart
          </button>
        </Link>

        <Link to="/my-orders">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
            📦 My Orders
          </button>
        </Link>
      </div>
    </div>
  );
}
