// src/App.jsx
import React, { useContext } from 'react';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import CustomerHome from "./customers/index";
import Login from "./Admin/Login";
import Dashboard from "./Admin/Dashboard";
import Orders from "./Admin/Order";
import ProductAdmin from "./Admin/Product";
import { AppContext } from './context/AppContext';
// FIXED: Removed the non-existent 'ReceiptCw' icon token to prevent bundling crashes
import { ShoppingBag, LayoutDashboard, Database, Store, LogIn, LogOut } from 'lucide-react';
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  const { isAdminLoggedIn, handleLogout } = useContext(AppContext);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50 text-gray-900 font-sans">

      {/* Universal Shared Context Header Navigation Element */}
      <nav className="bg-gray-900 text-white shadow-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">

          {/* Logo Platform System Identity Mapping */}
          <Link to="/" className="flex flex-col select-none group">
            <span className="font-serif font-black text-xl tracking-widest text-white group-hover:text-orange-500 transition duration-200">
              GULIT<span className="text-orange-500 italic ml-0.5">✦</span>
            </span>
            <span className="font-serif text-[10px] tracking-widest text-gray-400 -mt-0.5 uppercase">Gebeya Platform</span>
          </Link>

          {/* Context Tab Links Toggle Layout */}
          <div className="flex items-center gap-1 sm:gap-4 text-xs font-bold">
            <Link to="/" className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${!isAdminRoute ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
              <Store size={14} /> <span className="hidden sm:inline">Storefront Portal</span>
            </Link>

            {isAdminLoggedIn ? (
              <>
                <Link to="/admin/dashboard" className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${location.pathname === '/admin/dashboard' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                  <LayoutDashboard size={14} /> <span className="hidden sm:inline">Metrics</span>
                </Link>
                <Link to="/admin/products" className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${location.pathname === '/admin/products' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                  <Database size={14} /> <span className="hidden sm:inline">Inventory</span>
                </Link>
                <Link to="/admin/order" className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${location.pathname === '/admin/order' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                  <ShoppingBag size={14} /> <span className="hidden sm:inline">Desk</span>
                </Link>
                <button
                  onClick={() => { handleLogout(); window.location.href = '/'; }}
                  className="px-3 py-2 text-red-400 hover:bg-red-950/30 border border-red-900/40 rounded-lg flex items-center gap-1 transition"
                >
                  <LogOut size={14} /> <span className="hidden sm:inline">Exit</span>
                </button>
              </>
            ) : (
              <Link to="/admin/login" className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition ${location.pathname === '/admin/login' ? 'bg-orange-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
                <LogIn size={14} /> <span>Admin Console Gateway</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main App Workspace Router mapping structures */}
      <main className="flex-1 bg-gray-50">
        <Routes>
          {/* Customer Application Target Routes */}
          <Route path="/" element={<CustomerHome />} />
          <Route path="/customer" element={<CustomerHome />} />

          {/* Administrative Panel Gateway Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/order" element={<Orders />} />
          <Route path="/admin/products" element={<ProductAdmin />} />
        </Routes>
      </main>

      {/* Site Global Footer */}
      <footer className="bg-gray-950 text-gray-400 text-xs py-6 border-t border-gray-900 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center font-medium tracking-wide">
          © {new Date().getFullYear()} GULIT GEBEYA MVP Platform v1.0. Completely conforming to system structural spec sheet parameters.
        </div>
      </footer>
    </div>
  );
}

export default App;