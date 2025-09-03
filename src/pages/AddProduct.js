import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Read user info from localStorage key 'user'
  const farmer = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if logged-in user is a farmer
    if (!farmer || farmer.role !== 'farmer' || !farmer._id) {
      alert('Please log in as a farmer to add products.');
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/products', {
        name,
        price: Number(price),
        description,
        farmerId: farmer._id,
      });

      navigate('/my-products');
    } catch (err) {
      alert('Failed to add product: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">➕ Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border mb-2"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border mb-2"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border mb-4"
        required
      />
      <button type="submit" className="bg-green-600 text-white p-2 w-full rounded">
        Add Product
      </button>
    </form>
  );
}
