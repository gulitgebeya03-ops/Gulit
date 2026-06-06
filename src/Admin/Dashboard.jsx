import products from "../data/Product";

const metrics = (products) => [
  {
    label: "Total products",
    value: products.length,
    sub: `across ${new Set(products.map((p) => p.category)).size} categories`,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    iconBg: "bg-blue-50 text-blue-700",
  },
  {
    label: "Total stock",
    value: products.reduce((t, p) => t + p.stock, 0),
    sub: "units available",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path d="M5 8h14M5 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm14 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0zM5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
      </svg>
    ),
    iconBg: "bg-green-50 text-green-700",
  },
  {
    label: "Inventory value",
    value: "ETB " + products.reduce((t, p) => t + p.price * p.stock, 0).toLocaleString(),
    sub: "at current prices",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
        <path d="M3 3v18h18" /><path d="m7 16 4-4 4 4 4-4" />
      </svg>
    ),
    iconBg: "bg-purple-50 text-purple-700",
  },
];

const categoryStyle = {
  Electronics: "bg-blue-50 text-blue-700",
  Fashion: "bg-purple-50 text-purple-700",
};

const maxStock = Math.max(...products.map((p) => p.stock));

const Dashboard = () => {
  const cards = metrics(products);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-medium text-gray-900">Admin dashboard</h1>
        <span className="text-sm text-gray-400">
          {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-gray-50 rounded-xl p-5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${card.iconBg}`}>
              {card.icon}
            </div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">{card.label}</p>
            <p className="text-2xl font-medium text-gray-900 leading-none">{card.value}</p>
            <p className="text-xs text-gray-400 mt-1.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Products table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-800">Products</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["Name", "Category", "Price", "Stock"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-2.5 text-left text-[11px] uppercase tracking-wider text-gray-400 font-normal"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr
                key={p.id}
                className={i < products.length - 1 ? "border-b border-gray-50" : ""}
              >
                <td className="px-5 py-3 font-medium text-gray-900">{p.name}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[11px] ${
                      categoryStyle[p.category] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p.category}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-700">ETB {p.price.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 w-6 text-right">{p.stock}</span>
                    <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gray-400"
                        style={{ width: `${(p.stock / maxStock) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;