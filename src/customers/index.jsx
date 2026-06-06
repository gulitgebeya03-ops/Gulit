import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 45000,
    stock: 10,
    category: "Electronics",
    image: "https://picsum.photos/300?1",
  },
  {
    id: 2,
    name: "Phone",
    price: 25000,
    stock: 15,
    category: "Electronics",
    image: "https://picsum.photos/300?2",
  },
  {
    id: 3,
    name: "Shoes",
    price: 3500,
    stock: 20,
    category: "Fashion",
    image: "https://picsum.photos/300?3",
  },
];

const categories = ["All", ...new Set(products.map((p) => p.category))];

function formatPrice(n) {
  return "ETB " + n.toLocaleString();
}

export default function ProductShop() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [cart, setCart] = useState({});

  const filtered = products.filter(
    (p) =>
      (activeFilter === "All" || p.category === activeFilter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartCount = Object.keys(cart).length;
  const cartTotal = products
    .filter((p) => cart[p.id])
    .reduce((sum, p) => sum + p.price, 0);

  function toggleCart(id) {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                activeFilter === cat
                  ? "bg-gray-900 text-white border-transparent"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cart button */}
        <button className="relative flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <p className="text-center py-16 text-sm text-gray-400">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((product) => {
            const inCart = !!cart[product.id];
            return (
              <div
                key={product.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover bg-gray-50"
                />
                <div className="p-3">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                    {product.category}
                  </p>
                  <p className="text-sm font-medium text-gray-900 mb-3">
                    {product.name}
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {product.stock} in stock
                      </p>
                    </div>
                    <button
                      onClick={() => toggleCart(product.id)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${
                        inCart
                          ? "bg-gray-900 text-white border-transparent"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          Added
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                          Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cart summary */}
      {cartCount > 0 && (
        <div className="mt-6 flex items-center justify-between px-5 py-4 bg-gray-50 rounded-xl">
          <span className="text-sm text-gray-500">
            {cartCount} item{cartCount > 1 ? "s" : ""} in cart
          </span>
          <span className="text-sm font-medium text-gray-900">
            Total: {formatPrice(cartTotal)}
          </span>
        </div>
      )}
    </div>
  );
}