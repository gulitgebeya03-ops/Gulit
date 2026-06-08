import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import {
  Menu,
  X,
  User,
  ShoppingCart,
  Search,
} from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    console.log("Searching:", search);

    // Example:
    // navigate(/search?q=${search})
  };

  return (
    <>
      <header className="bg-gray-900 text-white shadow-md">

        {/* Desktop Header */}
        <div className="hidden md:block">

          {/* First Row */}
          <div className="flex items-center gap-15 px-6 py-3 bg-[#131921]">

            {/* Logo */}
            <Link
              to="/">
              <img src={logo} alt="logo"
              className="h-30 w-auto object-contain background: transparent;"
            />
            </Link>

            {/* Search */}
            <div className="flex flex-1 bg-white rounded-md overflow-hidden">

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="flex-1 px-4 py-2 text-black outline-none"
              />

              <button
                onClick={handleSearch}
                className="bg-yellow-400 px-4 text-black"
              >
                <Search size={20} />
              </button>
            </div>

            {/* User */}
            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-2"
            >
              <User size={22} />

              <div className="text-left">
                
                <p className="font-semibold">
                  Sign In / Register
                </p>
              </div>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center gap-2"
            >
              <ShoppingCart size={24} />
              <span>Cart</span>
            </Link>
          </div>

          {/* Second Row */}
          <div className="flex gap-8 px-6 py-2 border-t border-gray-700 bg-[#232F3E]">

            <Link to="/">Home</Link>

            <Link to="/admin/order">
              Order
            </Link>

            <Link to="/admin/dashboard">
              Dashboard
            </Link>

            <Link to="/customer">
              Customer
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden px-2 py-3">

          <div className="flex items-center gap-2">

            {/* Hamburger */}
            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              {menuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>

            {/* Logo */}
            <Link to="/">
             <img src={logo}
              alt="Gulit Logo" 
           className="h-12 w-auto object-contain"/> 
            </Link>

            {/* Search */}
            <div className="flex wd-200 bg-white rounded overflow-hidden">

              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="flex-1 px-2 py-1 text-black outline-none text-sm"
              />

              <button
                onClick={handleSearch}
                className="bg-yellow-400 px-2 text-black"
              >
                <Search size={16} />
              </button>
            </div>

            {/* User */}
            <button
              onClick={() => setAuthOpen(true)}
            >
              <User size={22} />
            </button>

            {/* Cart */}
<Link to="/cart">
              <ShoppingCart size={22} />
            </Link>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="flex flex-col gap-3 mt-4 bg-gray-800 p-3 rounded">

              <Link to="/">Home</Link>

              <Link to="/admin/order">
                Order
              </Link>

              <Link to="/admin/dashboard">
                Dashboard
              </Link>

              <Link to="/customer">
                Customer
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {authOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-lg p-6 w-80 text-black">

            <div className="flex justify-between mb-4">

              <button
                className={`flex-1 py-2 ${
                  !showRegister
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() =>
                  setShowRegister(false)
                }
              >
                Sign In
              </button>

              <button
                className={`flex-1 py-2 ${
                  showRegister
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() =>
                  setShowRegister(true)
                }
              >
                Register
              </button>
            </div>

            {!showRegister ? (
              <>
                <h2 className="font-bold text-xl mb-4">
                  Sign In
                </h2>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-2 mb-3"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border p-2 mb-3"
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h2 className="font-bold text-xl mb-4">
                  Register
                </h2>

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border p-2 mb-3"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-2 mb-3"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border p-2 mb-3"
                />

                <button className="w-full bg-green-600 text-white py-2 rounded">
                  Register
                </button>
              </>
            )}

            <button
              onClick={() =>
                setAuthOpen(false)
              }
              className="mt-4 w-full border py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;