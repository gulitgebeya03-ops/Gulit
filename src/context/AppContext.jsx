// src/context/AppContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  fetchProducts as apiFetchProducts,
  fetchCategories as apiFetchCategories,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProductFromApi,
  mapProductToApi,
  login as apiLogin,
  setAccessToken,
  getAccessToken,
} from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [cart, setCart] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(150);
  const [loading, setLoading] = useState(true);

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

  const [customers, setCustomers] = useState([
    { id: "CUST-1", name: "Abebe Kebede", phone: "0911223344", address: "Bole, Khartoum St, Addis Ababa" },
    { id: "CUST-2", name: "Chaltu Ibrahim", phone: "0912345678", address: "Megenagna, Ring Road, Addis Ababa" }
  ]);

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const [apiProducts, apiCategories] = await Promise.all([
          apiFetchProducts(),
          apiFetchCategories(),
        ]);
        if (cancelled) return;
        setProducts(apiProducts || []);
        setCategories((apiCategories || []).map(c => c.name));
      } catch (err) {
        console.error('Failed to load API data:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock) return prevCart;
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
          if (match && targets > match.stock) return item;
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

  const refreshProducts = useCallback(async () => {
    try {
      const apiProducts = await apiFetchProducts();
      setProducts(apiProducts || []);
    } catch (err) {
      console.error('Failed to refresh products:', err);
    }
  }, []);

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

    setProducts(prevProducts =>
      prevProducts.map(p => {
        const orderedItem = cart.find(c => c.product.id === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      })
    );

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

  const createProduct = async (prodData) => {
    try {
      const apiData = mapProductToApi(prodData);
      const created = await apiCreateProduct(apiData);
      setProducts(prev => [...prev, { ...created, stock: Number(prodData.stock) || 10, tag: prodData.tag || null }]);
      return created;
    } catch (err) {
      console.error('Failed to create product:', err);
      throw err;
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      const apiData = mapProductToApi(updatedData);
      const updated = await apiUpdateProduct(id, apiData);
      setProducts(prev => prev.map(p => p.id === id ? {
        ...updated,
        stock: Number(updatedData.stock) ?? p.stock,
        tag: updatedData.tag ?? p.tag,
      } : p));
      return updated;
    } catch (err) {
      console.error('Failed to update product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductFromApi(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
      throw err;
    }
  };

  const updateStockDirectly = (id, newStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, Number(newStock)) } : p));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleLogin = async (email, password) => {
    try {
      const result = await apiLogin(email, password);
      setAuthToken(result.access_token);
      setAccessToken(result.access_token);
      if (result.role === 'admin') {
        setIsAdminLoggedIn(true);
        return { success: true, role: 'admin' };
      }
      return { success: true, role: result.role || 'customer', user: result };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAuthToken(null);
    setAccessToken(null);
  };

  return (
    <AppContext.Provider value={{
      products, categories, orders, customers, deliveryFee, setDeliveryFee,
      cart, addToCart, updateCartQuantity, removeFromCart, clearCart, placeOrder,
      createProduct, updateProduct, deleteProduct, updateStockDirectly, updateOrderStatus,
      isAdminLoggedIn, setIsAdminLoggedIn, currentCustomer, setCurrentCustomer,
      authToken, handleLogin, handleLogout, loading, refreshProducts,
    }}>
      {children}
    </AppContext.Provider>
  );
};