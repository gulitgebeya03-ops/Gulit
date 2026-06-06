function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-semibold mt-4">
        {product.name}
      </h2>

      <p className="text-gray-600">
        ETB {product.price}
      </p>

      <p className="text-sm text-gray-500">
        Stock: {product.stock}
      </p>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;