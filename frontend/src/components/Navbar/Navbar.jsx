// src/components/Navbar/Navbar.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((s, i) => s + (i.qty || 0), 0));
  }, []);

  useEffect(() => {
    const handler = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.reduce((s, i) => s + (i.qty || 0), 0));
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const toggleMenu = () => setMobileMenu(v => !v);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">GroceryApp</Link>
      </div>

      <ul className={mobileMenu ? "nav-links-mobile" : "nav-links"} onClick={() => setMobileMenu(false)}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart">Cart ({cartCount})</Link></li>

        {isAuthenticated ? (
          <>
            <li style={{ pointerEvents: "none" }}>
              Hello, <strong>{user?.username || user?.name || user?.email}</strong>
            </li>
            <li><button className="link-button" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>

      <div className="nav-right">
        <button className="hamburger" onClick={toggleMenu} aria-label="menu">
          <span className="bar"></span><span className="bar"></span><span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
