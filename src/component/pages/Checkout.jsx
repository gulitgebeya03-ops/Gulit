import React from 'react';
// PARTNER LINKS: Submitting forms and aggregating calculations
import CheckoutForm from '../../components/checkout/CheckoutForm';
import OrderSummary from '../../components/checkout/OrderSummary';
import { useCart } from '../../hooks/useCart';

const Checkout = () => {
    const { cartItems } = useCart();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Secure Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
                {/* Left Side Form Entry Panel */}
                <section className="lg:col-span-7 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping & Payment Details</h2>
                    <CheckoutForm />
                </section>

                {/* Right Side Review Sticky Panel */}
                <section className="lg:col-span-5">
                    <div className="sticky top-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Review</h2>
                        <OrderSummary items={cartItems} />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Checkout;