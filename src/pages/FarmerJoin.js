import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FarmerJoin() {
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState({
    id: "",
    name: "",
    contact: "",
    bio: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmer({ ...farmer, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFarmer({ ...farmer, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("farmerProfile", JSON.stringify(farmer));
    alert("Farmer registered successfully ✅");
    navigate("/farmer-profile");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Join as Farmer</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "500px",
        }}
      >
        {/* Farmer ID */}
        <label>Farmer ID:</label>
        <input
          type="text"
          name="id"
          value={farmer.id}
          onChange={handleChange}
          placeholder="Enter your farmer ID"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          required
        />

        {/* Name */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={farmer.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          required
        />

        {/* Contact */}
        <label>Contact:</label>
        <input
          type="text"
          name="contact"
          value={farmer.contact}
          onChange={handleChange}
          placeholder="Phone or Email"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          required
        />

        {/* Bio */}
        <label>Bio:</label>
        <textarea
          name="bio"
          value={farmer.bio}
          onChange={handleChange}
          placeholder="Write about your farm, products, or yourself..."
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          required
        />

        {/* Image Upload */}
        <label>Profile Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: "15px" }}
        />

        {/* Preview */}
        {farmer.image && (
          <div style={{ marginBottom: "15px" }}>
            <img
              src={farmer.image}
              alt="Preview"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            background: "green",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Join as Farmer
        </button>
      </form>
    </div>
  );
}
