import React, { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaHeart,
  FaUser,
  FaTruck,
  FaBell,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ConsumerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        { id: "ORD001", product: "Ergonomic Chair", status: "Delivered" },
        { id: "ORD002", product: "Wooden Desk", status: "In Transit" },
        { id: "ORD003", product: "LED Lamp", status: "Pending" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex font-inter bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800/60 backdrop-blur-md border-r border-slate-700 hidden md:flex flex-col justify-between shadow-lg">
        <div>
          <div className="text-3xl font-century text-center py-6  border-b border-slate-700">
           Bilota.com
          </div>
          <nav className="mt-6 flex flex-col space-y-2 px-4">
            {[
              { to: "/my-orders", icon: <FaShoppingBag />, label: "My Orders" },
              { to: "/wishlist", icon: <FaHeart />, label: "Wishlist" },
              { to: "/profile", icon: <FaUser />, label: "My Profile" },
              { to: "/tracking", icon: <FaTruck />, label: "Track Orders" },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="flex items-center gap-3 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg p-3 transition-all duration-200"
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-700 p-4">
          <button className="flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold transition">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-slate-800/50 backdrop-blur-md px-6 py-4 border-b border-slate-700 sticky top-0 z-10">
          <div className="flex items-center gap-3 w-full max-w-md bg-slate-700/60 rounded-lg px-3 py-2">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="bg-transparent border-none focus:ring-0 outline-none w-full text-sm text-gray-200 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-6">
            <FaBell className="text-gray-400 hover:text-cyan-400 cursor-pointer text-lg transition" />
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-9 h-9 rounded-full border-2 border-cyan-400 shadow"
            />
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-8">
            Welcome back,{" "}
            <span className="text-cyan-400 font-bold">Customer</span>
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              {
                title: "Total Orders",
                value: "45",
                icon: <FaShoppingBag />,
                color: "bg-cyan-500/20 text-cyan-400",
              },
              {
                title: "Wishlist",
                value: "12",
                icon: <FaHeart />,
                color: "bg-pink-500/20 text-pink-400",
              },
              {
                title: "Delivered",
                value: "36",
                icon: <FaTruck />,
                color: "bg-green-500/20 text-green-400",
              },
              {
                title: "Pending",
                value: "9",
                icon: <FaUser />,
                color: "bg-yellow-500/20 text-yellow-400",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700 hover:border-cyan-400/50 shadow-md hover:shadow-cyan-500/20 transition-all duration-300 p-5 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-gray-400">{card.title}</p>
                  <h3 className="text-2xl font-semibold text-gray-100">
                    {card.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>{card.icon}</div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700 p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-cyan-400">
              <FaShoppingBag /> Recent Orders
            </h2>
            {loading ? (
              <p className="text-gray-400 animate-pulse">Loading orders...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-gray-300">
                  <thead>
                    <tr className="bg-slate-700/50 text-gray-400 uppercase text-xs tracking-wide">
                      <th className="p-3 border-b border-slate-700">Order ID</th>
                      <th className="p-3 border-b border-slate-700">Product</th>
                      <th className="p-3 border-b border-slate-700">Status</th>
                      <th className="p-3 border-b border-slate-700 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-700/40 transition-all duration-200"
                      >
                        <td className="p-3 border-b border-slate-700">
                          {order.id}
                        </td>
                        <td className="p-3 border-b border-slate-700">
                          {order.product}
                        </td>
                        <td
                          className={`p-3 border-b border-slate-700 font-medium ${
                            order.status === "Delivered"
                              ? "text-green-400"
                              : order.status === "In Transit"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {order.status}
                        </td>
                        <td className="p-3 border-b border-slate-700 text-right">
                          <button className="text-cyan-400 font-medium hover:underline">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsumerDashboard;
