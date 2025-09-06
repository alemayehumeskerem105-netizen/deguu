// Farmers
export const farmers = [
  {
    id: "123",
    name: "Farmer Bekele",
    contact: "0912345678",
    bio: "I grow vegetables and grains in Bahir Dar.",
    image: "https://example.com/farmer1.jpg",
  },
  {
    id: "456",
    name: "Farmer Almaz",
    contact: "0987654321",
    bio: "Specialized in fruits and organic produce.",
    image: "https://example.com/farmer2.jpg",
  },
];

// Products
export let products = [
  { id: "1", name: "Teff", price: 120, farmerId: "123", description: "High quality teff", image: "https://example.com/teff.jpg" },
  { id: "2", name: "Maize", price: 80, farmerId: "123", description: "Fresh maize", image: "https://example.com/maize.jpg" },
  { id: "3", name: "Wheat", price: 100, farmerId: "456", description: "Organic wheat", image: "https://example.com/wheat.jpg" },
];

// Orders
export const orders = [];

// Add product
export const addProduct = (product) => {
  products.push(product);
};

// Load all products
export const loadProducts = () => [...products];

// Update product
export const updateProduct = (id, updated) => {
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) products[index] = { ...products[index], ...updated };
};

// Delete product
export const deleteProduct = (id) => {
  products = products.filter((p) => p.id !== id);
};
