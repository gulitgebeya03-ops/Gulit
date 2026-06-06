function CartItem() {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4 rounded">
      <div>
        <h3 className="font-semibold">
          Product Name
        </h3>

        <p>ETB 1000</p>

        <p>Quantity: 1</p>
      </div>

      <div className="space-x-2">
        <button className="bg-gray-200 px-3 py-1 rounded">
          -
        </button>

        <button className="bg-gray-200 px-3 py-1 rounded">
          +
        </button>

        <button className="bg-red-500 text-white px-3 py-1 rounded">
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;