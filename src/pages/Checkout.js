import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Checkout({ cart, clearCart }) {
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  // ✅ Safe total calculation with quantity defaulting to 1
  const total = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      alert("⚠️ Please fill out all user details.");
      return;
    }

    const order = {
      id: Date.now(),
      name,
      phone,
      address,
      paymentMethod,
      items: cart,
      total,
      date: new Date().toLocaleString(),
    };

    // ✅ Save to localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert(`📧 Confirmation sent to ${name} (${phone})`);

    clearCart();
    navigate("/success", { state: order });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🧾 Checkout</h1>

      {cart.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/marketplace">Go shopping</Link>
        </p>
      ) : (
        <>
          {/* Cart Items */}
          <div style={{ marginBottom: 20 }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  paddingBottom: 10,
                  marginBottom: 10,
                }}
              >
                <strong>{item.name}</strong> – ${item.price} ×{" "}
                {item.quantity || 1} kg
              </div>
            ))}
          </div>

          {/* Order Total */}
          <h3>Total: ${total.toFixed(2)}</h3>

          {/* Buyer Info */}
          <div style={{ marginTop: 20, maxWidth: 400 }}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 10 }}
            />
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: "100%", padding: 10, marginBottom: 20 }}
            />
          </div>

          {/* Payment Method */}
          <label
            htmlFor="payment"
            style={{ display: "block", marginBottom: 10 }}
          >
            Select Payment Method:
          </label>
          <select
            id="payment"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ padding: 10, width: "100%", maxWidth: 300 }}
          >
            <option value="Mobile Money">Mobile Money</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Credit/Debit Card">Credit/Debit Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>

          {/* Place Order */}
          <button
            onClick={handlePlaceOrder}
            style={{
              marginTop: 30,
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            ✅ Place Order
          </button>

          <div style={{ marginTop: 20 }}>
            <Link to="/cart">← Back to Cart</Link>
          </div>
        </>
      )}
    </div>
  );
}
