function TrackOrder() {
  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="text-3xl font-bold mb-6">
        Track Order
      </h1>

      <input
        type="text"
        placeholder="Enter Order ID"
        className="w-full border rounded p-3 mb-4"
      />

      <button className="w-full bg-blue-600 text-white p-3 rounded">
        Track
      </button>

      <div className="mt-6">
        <p>Status: Pending</p>
      </div>
    </div>
  );
}

export default TrackOrder;