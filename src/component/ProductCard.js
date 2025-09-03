import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, addToCart }) {
  return (
    <div style={styles.card}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <strong style={styles.price}>${product.price}</strong>
      </Link>

      <button
        onClick={() => addToCart(product)}
        style={{
          marginTop: 12,
          padding: '8px 12px',
          width: '100%',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 16,
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

const styles = {
  card: {
    width: 220,
    padding: 16,
    margin: 12,
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    textAlign: 'center',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: 140,
    objectFit: 'cover',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    margin: '12px 0 6px',
  },
  description: {
    fontSize: 14,
    color: '#555',
    height: 40,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
  },
};
