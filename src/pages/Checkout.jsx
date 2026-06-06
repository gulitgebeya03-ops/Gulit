function Checkout() {
  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="w-full border rounded p-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full border rounded p-3"
        />

        <textarea
          placeholder="Delivery Address"
          className="w-full border rounded p-3"
          rows="4"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded">
          Place Order (COD)
        </button>
      </form>
    </div>
  );
}

export default Checkout;