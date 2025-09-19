// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ user, cart, setUser }) {
  return (
    <header style={{ padding: 10, backgroundColor: '#f4f4f4', display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <Link to="/" style={{ textDecoration: 'none', color: 'black', marginRight: '80px' }}>Home</Link>
        <Link to="/about" style={{ textDecoration: 'none', color: 'black', marginRight: '80px' }}>About</Link> {/* Fixed */}
        <Link to="/marketplace" style={{ textDecoration: 'none', color: 'black', marginRight: '80px' }}>Marketplace</Link>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'black', marginRight: '80px' }}>
          Cart ({cart.length})
        </Link>
      </div>
      <div>
        {user ? (
          <>
            👤 {user.email} | <button onClick={() => setUser(null)}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>  <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}
