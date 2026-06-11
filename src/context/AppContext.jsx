// src/context/AppContext.jsx
import React, { createContext, useState } from 'react';
import initialProducts from '../data/Products';

// 1. Create and export the Context object cleanly
export const AppContext = createContext();

// 2. Define the Provider Component wrapper
export const AppProvider = ({ children }) => {
  // --- Core States Configuration ---
  const [products, setProducts] = useState(initialProducts || []);
  const [categories, setCategories] = useState(["Electronics", "Fashion", "Home", "Sports", "Books"]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [cart, setCart] = useState([]); 
  const [deliveryFee, setDeliveryFee] = useState(150); // Default delivery fee in ETB

  // Dynamic Store Orders Tracking State
  const [orders, setOrders] = useState([
    {
      id: "ORD-101",
      customerName: "Abebe Kebede",
      phoneNumber: "0911223344",
      deliveryAddress: "Bole, Khartoum St, Addis Ababa",
      items: [
        { id: 1, name: "MacBook Pro 14\"", price: 95000, quantity: 1 }
      ],
      subtotal: 95000,
      deliveryFee: 150,
      total: 95150,
      status: "Delivered",
      date: "2026-06-01"
    },
    {
      id: "ORD-102",
      customerName: "Chaltu Ibrahim",
      phoneNumber: "0912345678",
      deliveryAddress: "Megenagna, Ring Road, Addis Ababa",
      items: [
        { id: 13, name: "Nike Air Max 270", price: 8500, quantity: 2 }
      ],
      subtotal: 17000,
      deliveryFee: 150,
      total: 17150,
      status: "Pending",
      date: "2026-06-10"
    }
  ]);

  // Track dynamic list of structural customers based on checkouts
  const [customers, setCustomers] = useState([
    { id: "CUST-1", name: "Abebe Kebede", phone: "0911223344", address: "Bole, Khartoum St, Addis Ababa" },
    { id: "CUST-2", name: "Chaltu Ibrahim", phone: "0912345678", address: "Megenagna, Ring Road, Addis Ababa" }
  ]);

  // --- Core Methods & Actions ---
  
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock) return prevCart; // Prevent overflow beyond available stock
        return prevCart.map(item => item.product.id === product.id ? { ...item, quantity: newQty } : item);
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId, amount) => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const match = products.find(p => p.id === productId);
          const targets = item.quantity + amount;
          if (targets <= 0) return null;
          if (match && targets > match.stock) return item; // Block exceeding stock caps
          return { ...item, quantity: targets };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (customerDetails) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const total = subtotal + deliveryFee;
    const newOrderId = `ORD-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder = {
      id: newOrderId,
      customerName: customerDetails.name,
      phoneNumber: customerDetails.phone,
      deliveryAddress: customerDetails.address,
      items: cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      subtotal,
      deliveryFee,
      total,
      status: "Pending",
      paymentMethod: "Cash on Delivery (COD)",
      date: new Date().toISOString().split('T')[0]
    };

    // Deduct stock levels from central catalog
    setProducts(prevProducts => 
      prevProducts.map(p => {
        const orderedItem = cart.find(c => c.product.id === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      })
    );

    // Register unique customer records
    setCustomers(prevCusts => {
      if (!prevCusts.some(c => c.phone === customerDetails.phone)) {
        return [...prevCusts, {
          id: `CUST-${prevCusts.length + 1}`,
          name: customerDetails.name,
          phone: customerDetails.phone,
          address: customerDetails.address
        }];
      }
      return prevCusts;
    });

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrderId;
  };

  // Product Manager CRUD Implementations
  const createProduct = (prodData) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts(prev => [...prev, { id: newId, ...prodData, price: Number(prodData.price), stock: Number(prodData.stock) }]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData, price: Number(updatedData.price), stock: Number(updatedData.stock) } : p));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStockDirectly = (id, newStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, Number(newStock)) } : p));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // 3. Return statement distribution
  return (
    <AppContext.Provider value={{
      products, categories, setCategories, orders, customers, deliveryFee, setDeliveryFee,
      cart, addToCart, updateCartQuantity, removeFromCart, clearCart, placeOrder,
      createProduct, updateProduct, deleteProduct, updateStockDirectly, updateOrderStatus,
      isAdminLoggedIn, setIsAdminLoggedIn, currentCustomer, setCurrentCustomer
    }}>
      {children}
    </AppContext.Provider>
  );
};