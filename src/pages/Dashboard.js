import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'farmer') {
      navigate('/FarmerDashboard');
    } else if (user.role === 'buyer') {
      navigate('/BuyerDashboard');
    }
  }, [user, navigate]);

  return <p>Redirecting...</p>;
}
