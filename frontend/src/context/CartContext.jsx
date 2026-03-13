import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => (p.id ?? p.name) === (product.id ?? product.name));

      if (existing) {
        toast.success(`${product.name} quantity updated`);
        return prev.map((p) =>
          (p.id ?? p.name) === (product.id ?? product.name)
            ? { ...p, qty: (p.qty || 1) + 1 }
            : p
        );
      }

      toast.success(`${product.name} added to cart`);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (key) => {
    toast.info("Item removed");
    setCart((prev) => prev.filter((p) => (p.id ?? p.name) !== key));
  };

  const updateQuantity = (key, delta) => {
    setCart((prev) =>
      prev.map((p) =>
        (p.id ?? p.name) === key
          ? { ...p, qty: Math.max((p.qty || 1) + delta, 1) }
          : p
      )
    );
  };

  const clearCart = () => {
    toast.warning("Cart cleared");
    setCart([]);
  };

  const total = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 0), 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
