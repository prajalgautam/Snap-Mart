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
} from "@/constants/orderStatus";
import { ROLE_ADMIN, ROLE_MERCHANT } from "@/constants/userRoles";
import useAuthStore from "@/stores/authStore";
import { useEffect, useState } from "react";
import { FaBoxOpen, FaCheckCircle, FaCoins, FaShoppingCart, FaStore, FaUsers } from "react-icons/fa";

const Card = ({ value, label, Icon, color }) => (
  <div className="bg-white dark:bg-gray-950 dark:text-white shadow-lg rounded-3xl border border-gray-100 dark:border-gray-800 p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
        <h2 className="font-extrabold text-4xl mt-2 tracking-tight">{value}</h2>
      </div>
      <Icon className={`text-2xl ${color}`} />
    </div>
  </div>
);

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
        const [ordersResponse, usersResponse, productsResponse] = await Promise.all([
          isAdmin ? getAllOrders() : getOrdersByMerchant(),
          isAdmin ? getAllUsers() : Promise.resolve({ data: [] }),
          getProducts(isAdmin ? {} : { createdBy: user._id }),
        ]);
        if (!cancelled) {
          setOrders(ordersResponse.data);
          setUsers(usersResponse.data);
          setProducts(productsResponse);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDashboardData();
    return () => { cancelled = true; };
  }, [user]);

  if (loading || !user) return <div className="py-24 flex justify-center"><Spinner /></div>;

  const isAdmin = user.roles?.includes(ROLE_ADMIN);
  const completedOrders = orders.filter((order) => order.status === ORDER_DELIVERED).length;
  const pendingOrders = orders.filter((order) => order.status === ORDER_PENDING).length;
  const revenue = orders
    .filter((order) => [ORDER_CONFIRMED, ORDER_DELIVERED].includes(order.status))
    .reduce((total, order) => total + (order.totalPrice || 0), 0);

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-100 dark:border-gray-800 pb-5">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {isAdmin ? "Platform dashboard" : "Store dashboard"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Metrics are calculated from the live SnapMart database.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card Icon={FaCoins} value={`Rs. ${revenue.toLocaleString()}`} label={isAdmin ? "Confirmed sales" : "Store sales"} color="text-teal-500" />
        <Card Icon={FaShoppingCart} value={orders.length} label="Orders" color="text-amber-500" />
        <Card Icon={FaBoxOpen} value={products.length} label="Products" color="text-indigo-500" />
        <Card Icon={FaCheckCircle} value={completedOrders} label="Delivered orders" color="text-emerald-500" />
        {isAdmin && <Card Icon={FaUsers} value={users.length} label="Registered users" color="text-indigo-500" />}
        {isAdmin && <Card Icon={FaStore} value={users.filter((account) => account.roles?.includes(ROLE_MERCHANT)).length} label="Merchant accounts" color="text-pink-500" />}
        {!isAdmin && <Card Icon={FaShoppingCart} value={pendingOrders} label="Pending orders" color="text-amber-500" />}
      </div>
    </div>
  );
};

export default DashboardPage;
