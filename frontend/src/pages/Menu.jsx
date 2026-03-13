import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";

const Menu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
