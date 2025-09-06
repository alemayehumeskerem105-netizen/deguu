import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadProducts, updateProduct } from "../mockData";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  // Load the product
  useEffect(() => {
    const products = loadProducts();
    const p = products.find((prod) => prod.id === id);
    if (p) setProduct(p);
  }, [id]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProduct((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(id, product);
    navigate("/my-products");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={product.name}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <input
          type="number"
          value={product.price}
          placeholder="Price"
          className="w-full border p-2 rounded"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />
        <textarea
          value={product.description}
          placeholder="Description"
          rows="3"
          className="w-full border p-2 rounded"
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
        {product.image && <img src={product.image} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded" />}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          💾 Update Product
        </button>
      </form>
    </div>
  );
}
