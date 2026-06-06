function ProductDetails() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src="https://picsum.photos/500"
          alt="Product"
          className="rounded-lg shadow"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">
            Product Name
          </h1>

          <p className="text-gray-600 mb-4">
            Product description goes here.
          </p>

          <p className="text-2xl font-semibold mb-4">
            ETB 45,000
          </p>

          <p className="text-green-600 mb-6">
            In Stock
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;