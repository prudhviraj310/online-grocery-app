import React from "react";
import "./ProductCard.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const ProductCard = ({ product, addToCart }) => {
  const imageUrl =
    product?.image?.startsWith("http")
      ? product.image
      : `${backendUrl}${product.image.startsWith("/") ? "" : "/"}${product.image}`;

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img
          src={imageUrl}
          alt={product?.name || "product image"}
          className="product-img"
        />
      </div>

      <div className="product-meta">
        <h3 className="product-name">{product?.name}</h3>
        {product?.price !== undefined && (
          <p className="product-price">₹{product.price}</p>
        )}
      </div>

      <button className="add-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
