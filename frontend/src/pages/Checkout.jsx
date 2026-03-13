import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Checkout = ({ cart, userId }) => {
  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("PhonePe");

  const handlePlaceOrder = async () => {
    if (!cart.length) return toast.error("Cart is empty");
    try {
      const res = await axios.post(`${BACKEND}/api/orders/create`, {
        userId,
        items: cart.map(item => ({
          productId: item.id ?? item._id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: item.image
        })),
        shippingAddress: shipping,
        paymentMethod
      });

      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Shipping Details</h2>
      <input placeholder="Full Name" onChange={e => setShipping({...shipping, fullName: e.target.value})} />
      <input placeholder="Phone" onChange={e => setShipping({...shipping, phone: e.target.value})} />
      <input placeholder="Address" onChange={e => setShipping({...shipping, address: e.target.value})} />
      <input placeholder="City" onChange={e => setShipping({...shipping, city: e.target.value})} />
      <input placeholder="State" onChange={e => setShipping({...shipping, state: e.target.value})} />
      <input placeholder="Postal Code" onChange={e => setShipping({...shipping, postalCode: e.target.value})} />
      <input placeholder="Country" onChange={e => setShipping({...shipping, country: e.target.value})} />

      <h2>Payment Method</h2>
      <select onChange={e => setPaymentMethod(e.target.value)}>
        <option value="PhonePe">PhonePe</option>
        <option value="PayPal">PayPal</option>
        <option value="CreditCard">Credit Card</option>
        <option value="DebitCard">Debit Card</option>
      </select>

      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
