import React, { useState } from "react";


const categories = [
  { name: "Crops", img: "https://example.com/crops.jpg" },
  { name: "Vegetables", img: "https://example.com/vegetables.jpg" },
  { name: "Livestock", img: "https://example.com/livestock.jpg" },
  { name: "Fruits", img: "https://example.com/fruits.jpg" },
];

const products = {
  Crops: ["Wheat", "Barley", "Maize"],
  Vegetables: ["Tomato", "Carrot", "Onion"],
  Livestock: ["Cattle", "Goats", "Sheep"],
  Fruits: ["Apple", "Mango", "Banana"],
};

export default function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="category-section" style={{ textAlign: "center" }}>
      <h2>Explore Categories</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            style={{
              border: selectedCategory === cat.name ? "2px solid green" : "1px solid gray",
              borderRadius: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <img
              src={cat.img}
              alt={cat.name}
              style={{ width: "100px", height: "100px", borderRadius: "10px" }}
            />
            <p>{cat.name}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>{selectedCategory === "All" ? "All Products" : selectedCategory}</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {selectedCategory === "All"
            ? Object.keys(products).map((cat) =>
                products[cat].map((item) => <li key={item}>{item}</li>)
              )
            : products[selectedCategory].map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
