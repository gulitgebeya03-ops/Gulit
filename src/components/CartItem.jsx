function CartItem({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">
          {item.name}
        </h3>

        <p>ETB {item.price}</p>

        <p>Quantity: {item.quantity}</p>
      </div>

      <div className="space-x-2">
        <button
          onClick={() => decreaseQuantity(item.id)}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          -
        </button>

        <button
          onClick={() => increaseQuantity(item.id)}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          +
        </button>

        <button
          onClick={() => removeItem(item.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;