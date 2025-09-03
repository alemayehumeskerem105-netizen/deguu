import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', description: '', price: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => navigate('/my-products'));
  }, [productId, navigate]);

  const handleChange = (e) => {
    setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update');
        alert('Product updated!');
        navigate('/my-products');
      })
      .catch(err => alert(err.message));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </label>

      <label className="block mb-2">
        Description:
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </label>

      <label className="block mb-2">
        Price:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </label>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}
