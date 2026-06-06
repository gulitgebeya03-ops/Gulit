function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {product.name}
        </h2>

        <p className="text-gray-600">
          ETB {product.price}
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Stock: {product.stock}
        </p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;