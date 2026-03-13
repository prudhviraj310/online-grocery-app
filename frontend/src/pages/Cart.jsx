import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const userId = localStorage.getItem("userId");

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BACKEND}/api/cart/${userId}`);
      const items = res.data.items || [];
      setCartItems(items);

      const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotal(totalPrice);
    } catch (err) {
      console.error("Fetch cart error:", err);
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const handleCheckout = () => {
    if (!cartItems.length) return toast.info("Cart is empty");
    // implement payment flow: PhonePe, PayPal, Credit/Debit
    toast.success("Proceeding to checkout...");
  };

  if (!cartItems.length)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.productId}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div>{item.name}</div>
          <div>₹{item.price} x {item.quantity}</div>
        </div>
      ))}

      <h3>Total: ₹{total.toFixed(2)}</h3>
      <button
        onClick={handleCheckout}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
