import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function FarmerDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const farmer = JSON.parse(localStorage.getItem('user'));
    if (!farmer || farmer.role !== 'farmer') {
      // Not logged in or not a farmer, redirect to login page
      navigate('/login');  // assuming you have a login page at /login
    }
  }, [navigate]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome, Farmer!</h1>
      
      <div className="space-y-4">
        <Link to="/my-products">
          <button className="px-4 py-2 bg-green-600 text-white rounded">
            🌾 My Products
          </button>
        </Link>

        <Link to="/add-product">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            ➕ Add New Product
          </button>
        </Link>
        <Link to="/livestock">
  <button className="px-4 py-2 bg-yellow-600 text-white rounded">
    🐄 Livestock
  </button>
</Link>

      </div>
    </div>
  );
}
