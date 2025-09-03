import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function FarmerProfile() {
  const { farmerId } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);

  // Mock farmers data
  const mockFarmers = [
    {
      id: 'farmer1',
      name: 'Amanuel Tesfaye',
      location: 'Bahir Dar',
      contact: 'amanuel@example.com',
      bio: 'Experienced teff and vegetable farmer from Bahir Dar.',
    },
    {
      id: 'farmer2',
      name: 'Selam Kebede',
      location: 'Hawassa',
      contact: 'selam@example.com',
      bio: 'Passionate about organic farming and coffee cultivation.',
    },
    {
      id: 'farmer3',
      name: 'Kedir Mohammed',
      location: 'Jimma',
      contact: 'kedir@example.com',
      bio: 'Specializes in grains and spices from Jimma region.',
    },
  ];

  // Mock products data
  const mockProducts = [
    {
      _id: '1',
      name: 'Fresh Tomatoes',
      price: 35,
      description: 'Organic tomatoes from Gojjam.',
      farmerId: 'farmer1',
    },
    {
      _id: '2',
      name: 'Green Peppers',
      price: 25,
      description: 'Locally grown green peppers.',
      farmerId: 'farmer2',
    },
    {
      _id: '3',
      name: 'Teff Grain',
      price: 80,
      description: 'High-quality brown teff.',
      farmerId: 'farmer3',
    },
  ];

  useEffect(() => {
    // Find farmer by ID
    const f = mockFarmers.find((farmer) => farmer.id === farmerId);
    setFarmer(f || null);

    // Filter products of this farmer
    const farmerProducts = mockProducts.filter(
      (product) => product.farmerId === farmerId
    );
    setProducts(farmerProducts);
  }, [farmerId]);

  if (!farmer) return <p>Farmer not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">👤 {farmer.name}</h1>
      <p className="text-gray-700 mb-4">📍 Location: {farmer.location}</p>
      <p className="mb-4">📧 Contact: {farmer.contact}</p>
      <p className="mb-6 italic">{farmer.bio}</p>

      <h2 className="text-2xl font-semibold mb-4">🌾 Products by {farmer.name}</h2>
      {products.length === 0 ? (
        <p>This farmer has not added any products yet.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product._id} className="border p-4 rounded shadow-sm">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-green-600 font-semibold">Price: {product.price} Birr</p>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
