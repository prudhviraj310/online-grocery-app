import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard/ProductCard";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState({});
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data || {});
      } catch (err) {
        console.error("PRODUCT API ERROR:", err);
        setProducts({});
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(
      (c) => (c.id ?? c.name) === (product.id ?? product.name)
    );
    if (existing) existing.qty = (existing.qty || 0) + 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert(`${product.name} added to cart`);
  };

  if (loading) {
    return <h2 className="center-text">Loading products...</h2>;
  }

  const categories = ["All", ...Object.keys(products).map((c) => c)];

  const filterItems = (items) =>
    items.filter((p) =>
      (p.name || "").toString().toLowerCase().includes(search.trim().toLowerCase())
    );

  // Reusable renderer for a single category as a HORIZONTAL scroller
  const renderHorizontalCategory = (category, items) => {
    if (!items || items.length === 0) return null;
    const filtered = search ? filterItems(items) : items;
    if (!filtered || filtered.length === 0) return (
      <section className="category-block" key={category}>
        <h2 className="category-title">{category.toUpperCase()}</h2>
        <div className="category-row">
          <p className="no-items">No items found.</p>
        </div>
      </section>
    );

    return (
      <section className="category-block" key={category}>
        <h2 className="category-title">{category.toUpperCase()}</h2>
        <div className="category-row">
          {filtered.map((item, idx) => (
            // keep using card-holder to guarantee fixed width and consistent alignment
            <div className="card-holder" key={item.id ?? `${item.name}-${idx}`}>
              <ProductCard product={item} addToCart={addToCart} />
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="home-wrap">
      <div className="home-inner">
        <header className="home-header">
          <input
            className="search-box"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="category-menu">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-btn ${selectedCat === cat ? "active" : ""}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat === "All" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </header>

        <main>
          {selectedCat === "All" ? (
            // all categories horizontal lists
            Object.keys(products).map((category) =>
              renderHorizontalCategory(category, products[category] || [])
            )
          ) : (
            // single category — now also horizontal (same look as All)
            renderHorizontalCategory(selectedCat, products[selectedCat] || [])
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
