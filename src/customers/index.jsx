import { useState, useMemo } from "react";
// FIXED: 'products' is now outside the curly braces because it's a default export
import products, { CATEGORIES, SORT_OPTIONS, formatPrice } from "../data/Products";

export default function ProductShop() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  // New states to make your sidebar filters actually work
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedTags, setSelectedTags] = useState([]);

  // Toggle quick filters (New Arrivals, Best Sellers, In Stock)
  function handleTagChange(tag) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = p.price <= maxPrice;

      // Map quick filter labels to your data object fields
      const matchesTags = selectedTags.every((tag) => {
        if (tag === "In Stock") return p.stock > 0;
        if (tag === "New Arrivals") return p.tag?.toLowerCase() === "new";
        if (tag === "Best Sellers") return p.tag?.toLowerCase() === "hot" || p.tag?.toLowerCase() === "sale";
        return true;
      });

      return matchesCategory && matchesSearch && matchesPrice && matchesTags;
    });

    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "In Stock") list = [...list].sort((a, b) => b.stock - a.stock);
    return list;
  }, [search, activeCategory, sort, maxPrice, selectedTags]);

  const cartItems = products.filter((p) => cart[p.id]);
  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price, 0);

  function toggleCart(id) {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = true;
      return next;
    });
  }

  function toggleWishlist(id) {
    setWishlist((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = true;
      return next;
    });
  }

  const catIcons = { All: "🛍️", Electronics: "⚡", Fashion: "👕", Home: "🏠", Sports: "🏃", Books: "📚" };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
      {/* ── TOP NAVBAR ── */}
      <nav style={{
        background: "#fff",
        borderBottom: "1px solid #ebebeb",
        position: "sticky", top: 0, zIndex: 100,
        padding: "0 2rem",
        display: "flex", alignItems: "center", gap: "1.5rem", height: 64,
      }}>
        <span style={{ flexShrink: 0, display: "flex", flexDirection: "column", lineHeight: 1, userSelect: "none" }}>
          <span style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "0.18em",
            color: "#111",
            textTransform: "uppercase",
          }}>
            Gulit
            <span style={{ color: "#e85d26", fontStyle: "italic", marginLeft: 3 }}>✦</span>
          </span>
          <span style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: 13,
            letterSpacing: "0.38em",
            color: "#888",
            textTransform: "uppercase",
            marginTop: 1,
          }}>Gebeya</span>
        </span>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 440, position: "relative" }}>
          <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "#999" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", paddingLeft: 38, paddingRight: 16, height: 40,
              border: "1px solid #e5e5e5", borderRadius: 10, background: "#f9f9f9",
              fontSize: 13.5, color: "#222", outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{
            padding: "0 12px", height: 40, border: "1px solid #e5e5e5",
            borderRadius: 10, fontSize: 13, background: "#fff", color: "#444",
            cursor: "pointer", outline: "none", flexShrink: 0,
          }}
        >
          {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
        </select>

        {/* Wishlist */}
        <button
          style={{
            position: "relative", background: "none", border: "1px solid #e5e5e5",
            borderRadius: 10, width: 40, height: 40, display: "flex", alignItems: "center",
            justifyContent: "center", cursor: "pointer", flexShrink: 0,
          }}
          aria-label="Wishlist"
        >
          <svg style={{ width: 18, height: 18 }} fill={Object.keys(wishlist).length > 0 ? "#e85d26" : "none"} stroke={Object.keys(wishlist).length > 0 ? "#e85d26" : "#666"} strokeWidth={2} viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {Object.keys(wishlist).length > 0 && (
            <span style={{
              position: "absolute", top: -5, right: -5, background: "#e85d26",
              color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: "50%",
              width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center",
            }}>{Object.keys(wishlist).length}</span>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={() => setCartOpen(!cartOpen)}
          style={{
            position: "relative", display: "flex", alignItems: "center", gap: 8,
            background: "#111", color: "#fff", border: "none", borderRadius: 10,
            padding: "0 16px", height: 40, fontSize: 13.5, fontWeight: 600,
            cursor: "pointer", flexShrink: 0,
          }}
        >
          <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Cart
          {cartCount > 0 && (
            <span style={{
              background: "#e85d26", borderRadius: "50%", fontSize: 10, fontWeight: 700,
              width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center",
            }}>{cartCount}</span>
          )}
        </button>
      </nav>

      <div style={{ display: "flex", maxWidth: 1400, margin: "0 auto" }}>
        {/* ── SIDEBAR ── */}
        <aside style={{
          width: 220, flexShrink: 0, padding: "2rem 1.25rem",
          position: "sticky", top: 64, height: "calc(100vh - 64px)",
          overflowY: "auto", borderRight: "1px solid #ebebeb", background: "#fff",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#aaa", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Categories</p>
          {CATEGORIES.map(cat => {
            const count = cat === "All" ? products.length : products.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "9px 12px", borderRadius: 10, border: "none",
                  background: activeCategory === cat ? "#111" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#555",
                  fontSize: 13.5, fontWeight: activeCategory === cat ? 600 : 400,
                  cursor: "pointer", marginBottom: 2, textAlign: "left", transition: "all .15s",
                }}
              >
                <span>{catIcons[cat] || "🛍️"} {cat}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  background: activeCategory === cat ? "rgba(255,255,255,.18)" : "#f0f0f0",
                  color: activeCategory === cat ? "#fff" : "#999",
                  borderRadius: 6, padding: "1px 7px",
                }}>{count}</span>
              </button>
            );
          })}

          {/* FIXED: Quick filters now work dynamically */}
          <div style={{ borderTop: "1px solid #ebebeb", marginTop: 28, paddingTop: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#aaa", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Quick filters</p>
            {["New Arrivals", "Best Sellers", "In Stock"].map(tag => (
              <label key={tag} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 12px", fontSize: 13, color: "#555", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  style={{ accentColor: "#111" }}
                /> {tag}
              </label>
            ))}
          </div>

          {/* FIXED: Price slider slider values state handler */}
          <div style={{ borderTop: "1px solid #ebebeb", marginTop: 24, paddingTop: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#aaa", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Price range</p>
            <input
              type="range"
              min={200}
              max={100000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              step={500}
              style={{ width: "100%", accentColor: "#111" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#999", marginTop: 4 }}>
              <span>ETB 200</span><span>Max: {formatPrice(maxPrice)}</span>
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={{ flex: 1, padding: "2rem 1.75rem" }}>
          {/* Cart drawer */}
          {cartOpen && (
            <div style={{
              background: "#fff", border: "1px solid #ebebeb", borderRadius: 16,
              marginBottom: 24, overflow: "hidden",
            }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>Cart ({cartCount})</span>
                <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888" }}>×</button>
              </div>
              {cartCount === 0 ? (
                <p style={{ padding: "20px", textAlign: "center", color: "#aaa", fontSize: 13 }}>Your cart is empty</p>
              ) : (
                <>
                  {cartItems.map(p => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderBottom: "1px solid #f8f8f8" }}>
                      <img src={p.image} alt={p.name} style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover", background: "#f0f0f0" }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "#111" }}>{p.name}</p>
                        <p style={{ margin: 0, fontSize: 12, color: "#888" }}>{formatPrice(p.price)}</p>
                      </div>
                      <button onClick={() => toggleCart(p.id)} style={{ background: "none", border: "none", color: "#e85d26", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Remove</button>
                    </div>
                  ))}
                  <div style={{ padding: "14px 20px", background: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "#666" }}>Total</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>{formatPrice(cartTotal)}</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111", letterSpacing: "-0.5px" }}>
                {activeCategory === "All" ? "All Products" : activeCategory}
              </h1>
              <p style={{ margin: 0, fontSize: 13, color: "#aaa", marginTop: 2 }}>
                {filtered.length} {filtered.length === 1 ? "product" : "products"}
                {search && ` for "${search}"`}
              </p>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#bbb" }}>
              <p style={{ fontSize: 14 }}>No products match your filters.</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}>
              {filtered.map(product => {
                const inCart = !!cart[product.id];
                const inWish = !!wishlist[product.id];
                const isHov = hoveredId === product.id;
                return (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      overflow: "hidden",
                      border: "1px solid #ebebeb",
                      transition: "box-shadow .2s, transform .2s",
                      boxShadow: isHov ? "0 8px 32px rgba(0,0,0,.10)" : "none",
                      transform: isHov ? "translateY(-2px)" : "none",
                      cursor: "default",
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%", aspectRatio: "1/1", objectFit: "cover",
                          display: "block", background: "#f5f5f5",
                          transition: "transform .35s",
                          transform: isHov ? "scale(1.05)" : "scale(1)",
                        }}
                      />
                      {product.tag && (
                        <span style={{
                          position: "absolute", top: 10, left: 10,
                          background: product.tag === "New" ? "#111" : "#e85d26",
                          color: "#fff", fontSize: 10, fontWeight: 700,
                          padding: "3px 9px", borderRadius: 6, letterSpacing: .5,
                        }}>{product.tag.toUpperCase()}</span>
                      )}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        style={{
                          position: "absolute", top: 10, right: 10,
                          background: "#fff", border: "none", borderRadius: 8,
                          width: 32, height: 32, display: "flex", alignItems: "center",
                          justifyContent: "center", cursor: "pointer",
                          boxShadow: "0 1px 6px rgba(0,0,0,.1)",
                          opacity: isHov || inWish ? 1 : 0,
                          transition: "opacity .2s",
                        }}
                        aria-label="Wishlist"
                      >
                        <svg style={{ width: 14, height: 14 }} fill={inWish ? "#e85d26" : "none"} stroke={inWish ? "#e85d26" : "#888"} strokeWidth={2} viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      {isHov && !inCart && (
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                          <button
                            onClick={() => toggleCart(product.id)}
                            style={{
                              width: "100%", padding: "11px 0",
                              background: "rgba(17,17,17,.88)", color: "#fff",
                              border: "none", fontSize: 13, fontWeight: 600,
                              cursor: "pointer", letterSpacing: .3,
                              backdropFilter: "blur(4px)",
                            }}
                          >+ Add to Cart</button>
                        </div>
                      )}
                      {inCart && (
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                          <button
                            onClick={() => toggleCart(product.id)}
                            style={{
                              width: "100%", padding: "11px 0",
                              background: "#e85d26", color: "#fff",
                              border: "none", fontSize: 13, fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >✓ In Cart — Remove</button>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: "14px 16px 16px" }}>
                      <p style={{ margin: "0 0 2px", fontSize: 10.5, fontWeight: 700, color: "#bbb", letterSpacing: 1.2, textTransform: "uppercase" }}>
                        {product.category}
                      </p>
                      <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 600, color: "#111", lineHeight: 1.3 }}>
                        {product.name}
                      </p>
                      <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {product.description}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111" }}>{formatPrice(product.price)}</p>
                          <p style={{ margin: 0, fontSize: 11, color: "#bbb" }}>{product.stock} left</p>
                        </div>
                        <button
                          onClick={() => toggleCart(product.id)}
                          style={{
                            width: 34, height: 34, borderRadius: 10, border: "none",
                            background: inCart ? "#111" : "#f3f3f3",
                            color: inCart ? "#fff" : "#444",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", transition: "all .15s", flexShrink: 0,
                          }}
                          aria-label={inCart ? "Remove from cart" : "Add to cart"}
                        >
                          {inCart ? (
                            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg>
                          ) : (
                            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Floating cart bar */}
      {cartCount > 0 && !cartOpen && (
        <div
          onClick={() => setCartOpen(true)}
          style={{
            position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
            background: "#111", color: "#fff", borderRadius: 50,
            padding: "14px 28px", display: "flex", alignItems: "center", gap: 20,
            cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,.25)",
            fontSize: 14, fontWeight: 600, zIndex: 200,
            transition: "box-shadow .2s",
          }}
        >
          <span style={{ background: "#e85d26", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{cartCount}</span>
          View cart
          <span style={{ color: "#e85d26", marginLeft: 8 }}>{formatPrice(cartTotal)}</span>
        </div>
      )}
    </div>
  );
}