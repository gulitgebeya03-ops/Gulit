import products from "../data/Product";


const Dashboard = () => {
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, item) => total + item.stock,
    0
  );

  const totalValue = products.reduce(
    (total, item) => total + item.price * item.stock,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Total Products</h2>
          <p className="text-3xl font-bold mt-2">
            {totalProducts}
          </p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Total Stock</h2>
          <p className="text-3xl font-bold mt-2">
            {totalStock}
          </p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-lg">Inventory Value</h2>
          <p className="text-3xl font-bold mt-2">
            ETB {totalValue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;