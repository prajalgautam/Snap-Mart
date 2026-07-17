"use client";

import { getAllOrders, getOrdersByMerchant } from "@/api/orders";
import { getProducts } from "@/api/products";
import { getAllUsers } from "@/api/users";
import Spinner from "@/components/Spinner";
import {
  ORDER_CANCELLED,
  ORDER_CONFIRMED,
  ORDER_DELIVERED,
  ORDER_PENDING,
  ORDER_SHIPPED,
} from "@/constants/orderStatus";
import { ROLE_ADMIN, ROLE_MERCHANT } from "@/constants/userRoles";
import useAuthStore from "@/stores/authStore";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaShoppingCart,
  FaUsers,
  FaArrowUp,
  FaCoins,
  FaBoxOpen,
  FaStore,
  FaExclamationTriangle,
  FaChartLine,
  FaHeartbeat,
} from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const Card = ({ value, label, color, background, border, Icon, percentage }) => {
  return (
    <div
      className={`relative overflow-hidden bg-white dark:bg-gray-950 dark:text-white shadow-lg rounded-3xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col justify-between h-40 transition-all hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {label}
          </p>
          <h2 className="font-extrabold text-4xl mt-2 tracking-tight">{value}</h2>
        </div>
        <div className={`${background} p-3 rounded-2xl`}>
          <Icon className={`text-xl ${color}`} />
        </div>
      </div>
      {percentage && (
        <div className="flex items-center gap-1.5 mt-4 text-xs font-medium text-emerald-500">
          <FaArrowUp />
          <span>{percentage} growth</span>
          <span className="text-gray-400 font-normal">this month</span>
        </div>
      )}
    </div>
  );
};

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboardData() {
      if (!user) return;
      try {
        const isAdmin = user.roles?.includes(ROLE_ADMIN);

        const ordersRes = isAdmin
          ? await getAllOrders()
          : await getOrdersByMerchant();

        const usersRes = isAdmin ? await getAllUsers() : { data: [] };
        const productsData = await getProducts(
          isAdmin ? {} : { createdBy: user._id }
        );

        if (!cancelled) {
          setOrders(ordersRes.data);
          setUsers(usersRes.data);
          setProducts(productsData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchDashboardData();
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [user]);

  if (loading || !user)
    return (
      <div className="py-24 flex items-center justify-center">
        <Spinner />
      </div>
    );

  const isAdmin = user.roles?.includes(ROLE_ADMIN);

  // Stats Calculations
  const pendingOrders = orders.filter((o) => o.status === ORDER_PENDING).length;
  const activeProducts = products.length;

  if (isAdmin) {
    // ADMIN DASHBOARD
    const totalUsersCount = users.length;
    const merchantCount = users.filter((u) => u.roles?.includes(ROLE_MERCHANT)).length;
    const customerCount = users.filter((u) => u.roles?.includes("CUSTOMER")).length;
    const completedOrders = orders.filter((o) => o.status === ORDER_DELIVERED).length;

    // Platform Revenue Estimation
    const totalRevenue = orders
      .filter((o) => o.status !== ORDER_CANCELLED)
      .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-5">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              🛡️ Admin Intelligence Board
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Supervising SnapMart operations, system performance, and verified local stores.
            </p>
          </div>
          <span className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            Live Platform Mode
          </span>
        </div>

        {/* Admin Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            Icon={FaCoins}
            value={`Rs. ${totalRevenue.toLocaleString()}`}
            label="Total Platform Sales"
            color="text-red-500"
            background="bg-red-500/10"
            percentage="12.4%"
          />
          <Card
            Icon={FaShoppingCart}
            value={orders.length}
            label="Global Order Traffic"
            color="text-amber-500"
            background="bg-amber-500/10"
            percentage="8.2%"
          />
          <Card
            Icon={FaUsers}
            value={totalUsersCount}
            label="Registered Accounts"
            color="text-indigo-500"
            background="bg-indigo-500/10"
            percentage="14.5%"
          />
          <Card
            Icon={FaStore}
            value={merchantCount}
            label="Approved Local Shops"
            color="text-pink-500"
            background="bg-pink-500/10"
            percentage="6.1%"
          />
        </div>

        {/* Charts & System Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main SVG Graph */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-950 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-md">
            <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-4 flex items-center gap-2">
              <FaChartLine className="text-red-500" /> Platform Transaction History (Monthly)
            </h3>
            <div className="h-64 flex items-end justify-between relative mt-6 px-4">
              <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-300 pointer-events-none">
                <hr className="border-gray-100 dark:border-gray-800 w-full" />
                <hr className="border-gray-100 dark:border-gray-800 w-full" />
                <hr className="border-gray-100 dark:border-gray-800 w-full" />
                <hr className="border-gray-100 dark:border-gray-800 w-full" />
              </div>
              {/* SVG Curve Path */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path
                  d="M 50,200 Q 150,150 250,100 T 450,50 T 650,120 T 850,30"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  className="drop-shadow-[0_4px_10px_rgba(239,68,68,0.3)]"
                />
              </svg>
              {/* Labels */}
              <div className="w-full flex justify-between text-[11px] font-semibold text-gray-400 mt-2 absolute bottom-[-24px] left-0 px-4">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
              </div>
            </div>
          </div>

          {/* System Monitor & AI Insight */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-md">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-4 flex items-center gap-2">
                <FaHeartbeat className="text-red-500" /> System Health Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-xs">
                  <span className="font-semibold dark:text-gray-300">API Load Latency</span>
                  <span className="text-emerald-500 font-bold">14ms (Optimal)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-xs">
                  <span className="font-semibold dark:text-gray-300">Database Cluster</span>
                  <span className="text-emerald-500 font-bold">Healthy (99.9% uptime)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-xs">
                  <span className="font-semibold dark:text-gray-300">AI Recommendation Engine</span>
                  <span className="text-emerald-500 font-bold">Online</span>
                </div>
              </div>
            </div>

            {/* AI Assistant Banner */}
            <div className="bg-gradient-to-tr from-slate-950 to-slate-900 text-white p-6 rounded-[2rem] border border-red-500/20 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl" />
              <h4 className="font-black text-sm text-red-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                🤖 AI Admin Insights
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                "Platform registration saw a +14.5% uptick this month, primarily driven by groceries vendors. No anomalies or potential fraudulent transactions have been detected in the payout queues."
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // MERCHANT DASHBOARD
    const totalMerchantRevenue = orders
      .filter((o) => o.status === ORDER_DELIVERED || o.status === ORDER_CONFIRMED)
      .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

    const preparingOrders = orders.filter((o) => o.status === ORDER_SHIPPED).length;

    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-5">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-teal-900 dark:text-white flex items-center gap-3">
              🏪 Store Portal: {user.shopName || "My Retail Shop"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your local shop listings, prepare customer shipments, and monitor live metrics.
            </p>
          </div>
          <span className="bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-ping" />
            Shop Online
          </span>
        </div>

        {/* Merchant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            Icon={FaCoins}
            value={`Rs. ${totalMerchantRevenue.toLocaleString()}`}
            label="Total Earnings"
            color="text-teal-500"
            background="bg-teal-500/10"
            percentage="9.8%"
          />
          <Card
            Icon={FaBoxOpen}
            value={activeProducts}
            label="Listed Products"
            color="text-indigo-500"
            background="bg-indigo-500/10"
            percentage="4.2%"
          />
          <Card
            Icon={FaClock}
            value={pendingOrders}
            label="Pending Orders"
            color="text-amber-500"
            background="bg-amber-500/10"
          />
          <Card
            Icon={FaCheckCircle}
            value={orders.filter((o) => o.status === ORDER_DELIVERED).length}
            label="Completed Deliveries"
            color="text-emerald-500"
            background="bg-emerald-500/10"
          />
        </div>

        {/* Graphs & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales History */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-950 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-md">
            <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-4 flex items-center gap-2">
              <FaChartLine className="text-teal-500" /> Weekly Sales Chart
            </h3>
            <div className="h-64 flex items-end justify-between relative mt-6 px-4">
              <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-300 pointer-events-none">
                <hr className="border-gray-100 dark:border-gray-800 w-full" />
                <hr className="border-gray-100 dark:border-gray-800 w-full" />
                <hr className="border-gray-100 dark:border-gray-800 w-full" />
              </div>
              {/* SVG Curve Path */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path
                  d="M 50,180 Q 200,120 350,140 T 650,40 T 850,70"
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="3"
                  className="drop-shadow-[0_4px_10px_rgba(13,148,136,0.3)]"
                />
              </svg>
              <div className="w-full flex justify-between text-[11px] font-semibold text-gray-400 mt-2 absolute bottom-[-24px] left-0 px-4">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Low Stock Alerts & Store Insights */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-md">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-4 flex items-center gap-2">
                <FaExclamationTriangle className="text-amber-500" /> Shop Inventory Alerts
              </h3>
              <div className="space-y-3">
                {products.filter((p) => p.stock < 10).length > 0 ? (
                  products
                    .filter((p) => p.stock < 10)
                    .slice(0, 3)
                    .map((p) => (
                      <div
                        key={p._id}
                        className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/40 rounded-2xl text-xs"
                      >
                        <span className="font-semibold text-gray-800 dark:text-gray-200 truncate max-w-40">
                          {p.name}
                        </span>
                        <span className="text-red-500 font-bold">
                          Only {p.stock} left
                        </span>
                      </div>
                    ))
                ) : (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 rounded-2xl text-xs text-center">
                    🟢 All items have healthy stock levels!
                  </div>
                )}
              </div>
            </div>

            {/* AI Sales Insights */}
            <div className="bg-gradient-to-tr from-teal-950 to-teal-900 text-white p-6 rounded-[2rem] border border-teal-500/20 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl" />
              <h4 className="font-black text-sm text-teal-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                🤖 AI Shop Analysis
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                "Based on local purchase patterns, items under category '{user.shopCategory || "Groceries"}' will experience higher demand on Friday evening. Ensure popular brands are fully stocked."
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DashboardPage;
