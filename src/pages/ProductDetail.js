import React from 'react';
import { useParams, Link } from 'react-router-dom';
import product from '../data/product';

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const prod = product.find((p) => p.id === parseInt(id));

  if (!prod) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Product not found</h2>
        <Link to="/marketplace">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Link to="/marketplace" style={{ marginBottom: 20, display: 'inline-block' }}>
        ← Back to Marketplace
      </Link>
      <h1>{prod.name}</h1>
      <img
        src={prod.image}
        alt={prod.name}
        style={{ width: 400, height: 300, objectFit: 'cover', borderRadius: 10 }}
      />
      <p style={{ maxWidth: 600, marginTop: 20 }}>{prod.description}</p>
      <strong style={{ fontSize: 24, color: '#4CAF50' }}>${prod.price}</strong>

      <button
        onClick={() => addToCart(prod)}
        style={{
          marginTop: 20,
          padding: '12px 20px',
          fontSize: 18,
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
