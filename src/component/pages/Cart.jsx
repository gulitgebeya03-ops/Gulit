import React from 'react';
import { Link } from 'react-router-dom';
// PARTNER LINKS: Importing structural cart blocks
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import { useCart } from '../../hooks/useCart';

const Cart = () => {
    const { cartItems, updateQuantity, removeItem } = useCart();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Shopping Cart</h1>

            {cartItems?.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
                    <Link to="/products" className="text-indigo-600 font-medium hover:text-indigo-500">
                        Continue Shopping &rarr;
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10">
                    {/* Main Item List */}
                    <section className="lg:col-span-7 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <ul className="divide-y divide-gray-200">
                            {cartItems?.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeItem}
                                />
                            ))}
                        </ul>
                    </section>

                    {/* Checkout Breakdown Panel */}
                    <section className="lg:col-span-5">
                        <div className="sticky top-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <CartSummary items={cartItems} />
                            <Link to="/checkout" className="block w-full mt-6 text-center bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition">
                                Proceed to Checkout
                            </Link>
                        </div>

                    </section>
                </div>
            )}
        </main>
    );
};

export default Cart;