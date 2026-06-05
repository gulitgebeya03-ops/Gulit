import React, { useState } from 'react';
// PARTNER LINKS: Importing catalog layouts
import ProductGrid from '../../components/product/ProductGrid';
import SearchBar from '../../components/common/SearchBar';

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Electronics', 'Apparel', 'Home & Living', 'Accessories'];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Title & Search Panel Header */}
            <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Products</h1>
                <div className="mt-3 sm:mt-0 sm:ml-4 w-full sm:max-w-xs">
                    <SearchBar />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Left Side Filters - Visible desktop, collapses smoothly */}
                <aside className="hidden lg:block space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-3">Categories</h3>
                        <ul className="space-y-4 pt-4 text-sm font-medium text-gray-600">
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <button
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`hover:text-indigo-600 ${selectedCategory === cat ? 'text-indigo-600 font-bold' : ''}`}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Right Side Results Grid */}
                <section className="lg:col-span-3">
                    {/* Passing the state as a prop so your teammates can hook it up inside useProducts */}
                    <ProductGrid filterCategory={selectedCategory} />
                </section>
            </div>
        </main>
    );
};

export default Products;