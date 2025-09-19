import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h1>ℹ️ About Us</h1>
      <p>
        Welcome to our marketplace! We connect buyers and sellers, providing
        a seamless shopping experience. You can browse products, add them to
        your cart, and checkout easily.
      </p>
      <p>
        Our mission is to make online shopping simple, reliable, and enjoyable
        for everyone.
      </p>

      <Link to="/" style={{ marginTop: 20, display: 'inline-block' }}>
        ← Back to Home
      </Link>
    </div>
  );
}
