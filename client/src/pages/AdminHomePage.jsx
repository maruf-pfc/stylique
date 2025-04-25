import React from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const orders = [
    {
      _id: 12322,
      user: {
        name: "John Doe",
      },
      totalPrice: 200,
      status: "Pending",
    },
    {
      _id: 12323,
      user: {
        name: "Jane Smith",
      },
      totalPrice: 150,
      status: "Shipped",
    },
    {
      _id: 12324,
      user: {
        name: "Alice Johnson",
      },
      totalPrice: 300,
      status: "Delivered",
    },
    {
      _id: 12325,
      user: {
        name: "Bob Brown",
      },
      totalPrice: 400,
      status: "Cancelled",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">$20414</p>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">200</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            View Orders
          </Link>
        </div>
        <div className="p-4 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">100</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline">
            Manage Products
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-100 cursor-pointer text-gray-900"
                >
                  <td className="p-4">{order._id}</td>
                  <td className="p-4">{order.user.name}</td>
                  <td className="p-4">{order.totalPrice}</td>
                  <td className="p-4">{order.status}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td className="p-4 text-center text-gray-500" colSpan={4}>
                    No recent orders found.
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

export default AdminHomePage;
