import React, { useState, useEffect } from "react";
import { orders as mockOrders, buyer } from "../mockOrders";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Show only orders belonging to this buyer
    const myOrders = mockOrders.filter((o) => o.buyerId === buyer.id);
    setOrders(myOrders);
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛒 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{o.product}</h3>
                <p>Price: {o.price} Birr</p>
                <p>Status: {o.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
