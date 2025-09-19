import React from 'react';
import { Link } from 'react-router-dom';

export default function Cart({ cart, setCart }) {
  // Count quantities of each product
  const quantities = cart.reduce((acc, product) => {
    acc[product.id] = (acc[product.id] || 0) + 1;
    return acc;
  }, {});

  // Unique products in cart
  const uniqueProducts = Object.values(
    cart.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {})
  );

  // Calculate total price
  const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);

  // Increase quantity of a product
  const increaseQty = (product) => {
    setCart([...cart, product]);
  };

  // Decrease quantity of a product
  const decreaseQty = (productId) => {
    const index = cart.findIndex((p) => p.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/marketplace">Back to Marketplace</Link>
        </>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {uniqueProducts.map((product) => (
              <li
                key={product.id}
                style={{
                  marginBottom: 12,
                  padding: 12,
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8 }}
                />
                <div style={{ flex: 1, marginLeft: 12 }}>
                  <h3>{product.name}</h3>
                  <p>Quantity: {quantities[product.id]}</p>
                  <p>Price: ${(product.price * quantities[product.id]).toFixed(2)}</p>
                </div>
                <div>
                  <button
                    onClick={() => increaseQty(product)}
                    style={{ marginRight: 6 }}
                  >
                    +
                  </button>
                  <button onClick={() => decreaseQty(product.id)}>-</button>
                </div>
              </li>
            ))}
          </ul>

          <h2>Total: ${totalPrice.toFixed(2)}</h2>
          <Link to="/marketplace" style={{ marginTop: 20, display: 'inline-block' }}>
            Continue Shopping
          </Link>
          <Link to="/checkout">
  <button style={{ marginTop: 20, padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: 5 }}>
    Proceed to Checkout
  </button>
</Link>

        </>
      )}
    </div>
  );
}