import React from 'react';
import { Link } from 'react-router-dom';
// PARTNER LINKS: Importing landing elements from your team's folders
import ProductGrid from '../../components/product/ProductGrid';
import CategoryCard from '../../components/product/CategoryCard';

const Home = () => {
    // Mock categories array - easy for your teammates to swap with Context/API values later
    const categories = [
        { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
        { id: 2, name: 'Apparel', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500' },
        { id: 3, name: 'Home & Living', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500' },
    ];

    return (
        <div className="space-y-16 pb-16">
            {/* Hero Section */}
            <section className="relative bg-gray-900 h-[60vh] flex items-center justify-center text-center px-4">
                <div className="absolute inset-0 overflow-hidden opacity-60">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        New Season, New Styles
                    </h1>
                    <p className="mt-4 text-xl text-gray-200">
                        Check out our latest curated items engineered for modern comfort.
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/products"
                            className="inline-block bg-white border border-transparent rounded-md py-3 px-8 font-medium text-gray-900 hover:bg-gray-100 transition"
                        >
                            Shop Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Grid Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-baseline mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                    <Link to="/products" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                        View all &rarr;
                    </Link>
                </div>
                {/* Letting ProductGrid handle the actual mapping of internal items */}
                <ProductGrid limit={4} />
            </section>
        </div>
    );
};

export default Home;