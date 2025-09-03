// src/components/Navbar.js (or Header.js)

import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../Context/UserContext';

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: 10 }}>Home</Link>
      <Link to="/products" style={{ marginRight: 10 }}>Products</Link>
      <Link to="/orders" style={{ marginRight: 10 }}>Orders</Link>
      {!user && <Link to="/login">Login</Link>}

      {user && (
        <span style={{ marginLeft: 20 }}>
          👋 Welcome, <strong>{user.name}</strong> ({user.role})
        </span>
      )}
    </nav>
  );
};

export default Navbar;
