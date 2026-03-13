// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";
import { toast } from "react-toastify";
import "./Products.css";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Products = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    axios
      .get(`${BACKEND}/api/products`)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Products fetch error:", err);
        toast.error("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return toast.error("Please login first");

      const cartProduct = {
        productId: product.id || product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      };

      // Send to backend
      await axios.post(`${BACKEND}/api/cart/add`, { userId, product: cartProduct });

      // Update frontend cart (localStorage)
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((c) => c.productId === cartProduct.productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(cartProduct);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage")); // for Navbar update

      toast.success(`${product.name} added to cart`);
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart");
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;

  const categories = Object.keys(data).length ? Object.keys(data) : ["vegetables", "fruits", "dairy", "nuts"];

  return (
    <div className="products-container">
      {categories.map((category) => {
        const list = data[category];
        if (!list || !list.length) return null;
        return (
          <section key={category} className="category-section">
            <h2>{category.toUpperCase()}</h2>
            <div className="category-scroll">
              {list.map((item, idx) => {
                const imageUrl =
                  item.image && item.image.startsWith("http")
                    ? item.image
                    : item.image
                    ? `${BACKEND}${item.image.startsWith("/") ? "" : "/"}${item.image}`
                    : "/images/placeholder.jpg";

                return (
                  <ProductCard
                    key={item.id ?? `${item.name}-${idx}`}
                    product={{ ...item, image: imageUrl }}
                    addToCart={addToCart}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Products;
