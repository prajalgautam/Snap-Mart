import config from "@/config";
import api from "./api";
import { SAMPLE_PRODUCTS } from "./mockData";

const MOCK_ORDERS = [];

export const getAllOrders = async () => {
  if (!config.apiUrl) return { data: [...MOCK_ORDERS] };
  return await api.get(`/api/orders`);
};

export const getOrdersById = async (id) => {
  if (!config.apiUrl) {
    const order = MOCK_ORDERS.find((o) => o._id === id);
    return { data: order || null };
  }
  return await api.get(`/api/orders/${id}`);
};

export const getOrdersByUser = async (status) => {
  if (!config.apiUrl) {
    let orders = [...MOCK_ORDERS];
    if (status) orders = orders.filter((o) => o.status === status);
    return { data: orders };
  }
  return await api.get(`/api/orders/user?status=${status}`);
};

export const getOrdersByMerchant = async () => {
  if (!config.apiUrl) return { data: [] };
  return await api.get(`/api/orders/merchant`);
};

export const createOrder = async (data) => {
  if (!config.apiUrl) {
    const orderItems = (data.orderItems || []).map((item) => {
      const product = SAMPLE_PRODUCTS.find((p) => p._id === item.product);
      return {
        product: product || {
          _id: item.product,
          name: "Unknown Product",
          price: 0,
          imageUrls: [],
        },
        quantity: item.quantity,
      };
    });

    const order = {
      _id: `mock-order-${Date.now()}`,
      orderNumber: `ORD-${Date.now()}`,
      status: "PENDING",
      totalPrice: data.totalPrice,
      createdDate: new Date().toISOString(),
      orderItems,
    };
    MOCK_ORDERS.unshift(order);

    // Also cancel the order after a mock delay for the order page
    // This ensures the order appears correctly on the orders page
    return { data: order };
  }
  return await api.post(`/api/orders`, data);
};

export const cancelOrder = async (id) => {
  if (!config.apiUrl) {
    const idx = MOCK_ORDERS.findIndex((o) => o._id === id);
    if (idx !== -1) MOCK_ORDERS[idx].status = "CANCELLED";
    return { data: { message: "Order cancelled." } };
  }
  return await api.patch(`/api/orders/${id}/cancel`);
};

export const payViaKhalti = async (id) => {
  if (!config.apiUrl) {
    const idx = MOCK_ORDERS.findIndex((o) => o._id === id);
    if (idx !== -1) MOCK_ORDERS[idx].status = "CONFIRMED";
    return { data: { payment_url: "https://khalti.com/" } };
  }
  return await api.put(`/api/orders/${id}/payment/khalti`);
};

export const payViaCash = async (id) => {
  if (!config.apiUrl) {
    const idx = MOCK_ORDERS.findIndex((o) => o._id === id);
    if (idx !== -1) MOCK_ORDERS[idx].status = "CONFIRMED";
    return { data: { message: "Cash payment recorded." } };
  }
  return await api.put(`/api/orders/${id}/payment/cash`);
};

export const confirmOrder = async (id, status) => {
  if (!config.apiUrl) {
    const idx = MOCK_ORDERS.findIndex((o) => o._id === id);
    if (idx !== -1) MOCK_ORDERS[idx].status = status === "success" ? "CONFIRMED" : "CANCELLED";
    return { data: { message: "Order confirmed." } };
  }
  return await api.put(`/api/orders/${id}/confirm`, { status });
};

export const updateOrderStatus = async (id, status) => {
  if (!config.apiUrl) {
    const idx = MOCK_ORDERS.findIndex((o) => o._id === id);
    if (idx !== -1) MOCK_ORDERS[idx].status = status;
    return { data: { message: "Status updated." } };
  }
  return await api.put(`/api/orders/${id}/status`, { status });
};
