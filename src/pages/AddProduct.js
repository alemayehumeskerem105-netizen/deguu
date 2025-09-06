import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct, loadProducts } from "../mockData";
import { v4 as uuidv4 } from "uuid";

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,

  });

// Resize image before setting it in state
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxWidth = 300;  // max width in px
      const maxHeight = 300; // max height in px
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to base64 and save in state
      const dataUrl = canvas.toDataURL("image/jpeg", 0.7); // quality 0.7 to reduce size
      setProduct((prev) => ({ ...prev, image: dataUrl }));
    };
  };
  reader.readAsDataURL(file);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    addProduct({ id: uuidv4(), ...product, farmerId: user.id });
    navigate("/my-products");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={product.description}
          rows="3"
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
        {product.image && <img src={product.image} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded" />}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          💾 Save Product
        </button>
      </form>
    </div>
  );
}
