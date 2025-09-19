import React from 'react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>✅ Order Successful!</h1>
      <p>Thank you for your order. We've sent a confirmation message to your phone.</p>
      <Link to="/marketplace" style={{ marginTop: 20, display: 'inline-block' }}>
        🛍️ Continue Shopping
      </Link>
    </div>
  );
}