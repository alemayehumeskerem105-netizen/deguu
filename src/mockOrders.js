// src/mockOrders.js
import { v4 as uuidv4 } from "uuid";

// Mock orders array
export let orders = [
  {
    id: uuidv4(),
    productId: "1",
    buyerId: "b1",
    quantity: 2,
    total: 240,
    status: "pending",
  },
  {
    id: uuidv4(),
    productId: "2",
    buyerId: "b1",
    quantity: 1,
    total: 80,
    status: "completed",
  },
];

// Mock buyer
export const buyer = {
  id: "b1",
  name: "Almaz",
  email: "almaz@example.com",
};

// Add order
export const addOrder = (order) => {
  orders.push({ id: uuidv4(), ...order });
};

// Update order
export const updateOrder = (id, updated) => {
  const index = orders.findIndex((o) => o.id === id);
  if (index !== -1) orders[index] = { ...orders[index], ...updated };
};

// Delete order
export const deleteOrder = (id) => {
  orders = orders.filter((o) => o.id !== id);
};
