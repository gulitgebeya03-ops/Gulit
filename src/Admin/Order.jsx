import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Orders = () => {
  const { orders, updateOrderStatus } = useContext(AppContext);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Contact & Address</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Change Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-semibold text-gray-700">
                    {order.id.toString().startsWith("ORD-") ? order.id : `#${order.id}`}
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    {order.customerName || order.customer}
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    <div>{order.phoneNumber || "N/A"}</div>
                    <div className="text-xs text-gray-400 max-w-xs truncate">{order.deliveryAddress || "No Address Provided"}</div>
                  </td>
                  <td className="p-4 text-gray-900 font-medium">
                    ETB {order.total.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white inline-block ${order.status === "Delivered"
                          ? "bg-green-500"
                          : order.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="border border-gray-300 rounded text-sm px-2 py-1 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No placement orders tracked currently.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;