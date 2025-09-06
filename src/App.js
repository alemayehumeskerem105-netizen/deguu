import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/Header";
import MyOrders from "./pages/MyOrders";
import FarmerProfile from "./pages/FarmerProfile";
import FarmerJoin from "./pages/FarmerJoin";
import FarmerList from "./pages/FarmerList";



// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import LivestockPage from "./pages/LivestockPage";
import EditProduct from "./pages/EditProduct";
import Chat from "./pages/Chat";


// Dashboards
import AdminDashboard from "./pages/admin/AdminDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";

// Farmer-specific pages
import MyProducts from "./pages/MyProducts";
import AddProduct from "./pages/AddProduct";

export default function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  // keep cart synced with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // keep user synced with localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Protect routes by role
  const PrivateRoute = ({ roles, children }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (!roles.includes(user.role)) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <div className="app-container">
      <Header user={user} cart={cart} setUser={setUser} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
  path="/farmer-profile"
  element={
    <PrivateRoute roles={["farmer"]}>
      <FarmerProfile />
    </PrivateRoute>
  }
/>
<Route path="/join-farmer" element={<FarmerJoin />} />


        {/* Dashboards */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["farmer", "buyer"]}>
              {user?.role === "farmer" ? <FarmerDashboard /> : <BuyerDashboard />}
            </PrivateRoute>
          }
        />
        <Route
  path="/farmers"
  element={
    <PrivateRoute roles={["buyer"]}>
      <FarmerList />
    </PrivateRoute>
  }
/>

        <Route
  path="/chat"
  element={
    <PrivateRoute roles={["farmer", "buyer"]}>
      <Chat />
    </PrivateRoute>
  }
/>

<Route path="/my-orders" element={<MyOrders />} />

        <Route
          path="/admin/*"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Farmer-only pages */}
        <Route
          path="/my-products"
          element={
            <PrivateRoute roles={["farmer"]}>
              <MyProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute roles={["farmer"]}>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <PrivateRoute roles={["farmer"]}>
              <EditProduct />
            </PrivateRoute>
          }
        />

        {/* Marketplace & Shopping */}
        <Route
          path="/marketplace"
          element={<Marketplace addToCart={(p) => setCart([...cart, p])} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={(p) => setCart([...cart, p])} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} clearCart={() => setCart([])} />}
        />
        <Route path="/success" element={<Success />} />

        <Route
          path="/livestock"
          element={
            <PrivateRoute roles={["farmer"]}>
              <LivestockPage />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
