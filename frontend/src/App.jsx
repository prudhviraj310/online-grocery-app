import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  // Hide navbar ONLY on login and register
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <AuthProvider>

      {/* ToastContainer must be OUTSIDE Routes so toasts work continuously */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        pauseOnHover={false}
        closeOnClick={true}
      />

      {/* Navbar visible only when logged in pages */}
      {!hideNavbar && <Navbar />}

      <div className="main-content">
        <Routes>

          {/* Public Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Auth Protected Pages */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* If route not found → redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
