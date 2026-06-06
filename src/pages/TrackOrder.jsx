function TrackOrder() {
  return (
    <div className="container mx-auto max-w-lg px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        Track Your Order
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Order ID"
          className="w-full border p-3 rounded"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border p-3 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Track Order
        </button>
      </div>

      <div className="mt-10 bg-gray-100 p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">
          Order Status
        </h2>

        <p className="text-yellow-600 font-medium">
          Pending
        </p>

        {/*
          Other statuses:

          Processing
          Shipped
          Delivered
        */}
      </div>
    </div>
  );
}

export default TrackOrder;