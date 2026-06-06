function Checkout() {
  return (
    <div className="container mx-auto max-w-xl px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      <form className="space-y-5">
        <input
          type="text"
          placeholder="Customer Name"
          className="w-full border p-3 rounded"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Delivery Address"
          rows="4"
          className="w-full border p-3 rounded"
        />

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">
            Order Summary
          </h2>

          <p>Products: ETB 0</p>

          <p>Delivery Fee: ETB 50</p>

          <p className="font-bold">
            Total: ETB 50
          </p>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Place Order (COD)
        </button>
      </form>
    </div>
  );
}

export default Checkout;