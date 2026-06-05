import React from 'react';
import { useParams } from 'react-router-dom';
// PARTNER LINKS: Importing components from your team's folders
import ProductGallery from '../../components/product/ProductGallery';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { product, loading, error } = useProducts(id); // Hook managed by teammate

    if (loading) return <div className="h-screen flex justify-center items-center"><Loader /></div>;
    if (error) return <div className="text-center text-red-500 mt-10">Product not found.</div>;

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

                {/* Left Column: Product Gallery */}
                <section className="w-full">
                    <ProductGallery images={product?.images || []} />
                </section>

                {/* Right Column: Product Info */}
                <section className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl">
                            {product?.name || "Premium E-Commerce Item"}
                        </h1>
                        <p className="mt-4 text-2xl text-gray-900 font-semibold">
                            ${product?.price || "0.00"}
                        </p>

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <h3 className="text-sm font-medium text-gray-950">Description</h3>
                            <p className="mt-2 text-base text-gray-600 leading-relaxed">
                                {product?.description || "No description provided for this item."}
                            </p>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <Button
                            onClick={() => addToCart(product)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-lg font-medium transition-colors duration-200"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </section>

            </div>
        </main>
    );
};

export default ProductDetails;