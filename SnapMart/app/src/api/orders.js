import config from "@/config";
import api from "./api";
import { getMockProducts } from "./mockData";

function getMockOrders() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("snapmart_mock_orders");
    if (stored) return JSON.parse(stored);

    const products = getMockProducts();
    const defaultOrders = [
      {
        _id: "mock-order-1",
        orderNumber: "ORD-1718012345",
        status: "PENDING",
        totalPrice: products[0] ? products[0].price : 350,
        createdDate: new Date(Date.now() - 3600000).toISOString(),
        orderItems: [
          {
            product: products[0] || {
              _id: "prod-001",
              name: "Fresh Vegetables Combo Pack",
              price: 350,
              imageUrls: [],
              createdBy: "mock-user-merchant",
            },
            quantity: 1,
          },
        ],
        user: {
          _id: "mock-user-1",
          name: "Demo Customer",
          email: "demo@snapmart.com",
          phone: "9841234567",
        },
      },
      {
        _id: "mock-order-2",
        orderNumber: "ORD-1718012999",
        status: "CONFIRMED",
        totalPrice: products[1] ? products[1].price * 2 : 1160,
        createdDate: new Date(Date.now() - 86400000).toISOString(),
        orderItems: [
          {
            product: products[1] || {
              _id: "prod-002",
              name: "Dairy Essentials Bundle",
              price: 580,
              imageUrls: [],
              createdBy: "mock-user-merchant",
            },
            quantity: 2,
          },
        ],
        user: {
          _id: "mock-user-1",
          name: "Demo Customer",
          email: "demo@snapmart.com",
          phone: "9841234567",
        },
      },
    ];

    localStorage.setItem("snapmart_mock_orders", JSON.stringify(defaultOrders));
    return defaultOrders;
  } catch {}
  return [];
}

function saveMockOrders(orders) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("snapmart_mock_orders", JSON.stringify(orders));
  } catch {}
}

export const getAllOrders = async () => {
  if (!config.apiUrl) return { data: getMockOrders() };
  return await api.get(`/api/orders`);
};

export const getOrdersById = async (id) => {
  if (!config.apiUrl) {
    const orders = getMockOrders();
    const order = orders.find((o) => o._id === id);
    return { data: order || null };
  }
  return await api.get(`/api/orders/${id}`);
};

export const getOrdersByUser = async (status) => {
  if (!config.apiUrl) {
    let orders = getMockOrders();
    if (status) orders = orders.filter((o) => o.status === status);
    return { data: orders };
  }
  return await api.get(`/api/orders/user?status=${status}`);
};

export const getOrdersByMerchant = async () => {
  if (!config.apiUrl) {
    let merchantId = "mock-user-merchant";
    try {
      const auth = localStorage.getItem("zustand:auth-storage");
      if (auth) {
        const parsedAuth = JSON.parse(auth);
        if (parsedAuth?.state?.user?._id) {
          merchantId = parsedAuth.state.user._id;
        }
      }
    } catch {}

    const allOrders = getMockOrders();
    const merchantOrders = allOrders.filter((order) =>
      order.orderItems.some((item) => item.product.createdBy === merchantId)
    );
    return { data: merchantOrders };
  }
  return await api.get(`/api/orders/merchant`);
};

export const createOrder = async (data) => {
  if (!config.apiUrl) {
    const products = getMockProducts();
    const orderItems = (data.orderItems || []).map((item) => {
      const product = products.find((p) => p._id === item.product);
      return {
        product: product || {
          _id: item.product,
          name: "Unknown Product",
          price: 0,
          imageUrls: [],
          createdBy: "mock-user-merchant",
        },
        quantity: item.quantity,
      };
    });

    let authUser = {
      name: "Guest Customer",
      email: "guest@snapmart.com",
      phone: "9999999999",
    };
    try {
      const auth = localStorage.getItem("zustand:auth-storage");
      if (auth) {
        const parsedAuth = JSON.parse(auth);
        if (parsedAuth?.state?.user) {
          authUser = parsedAuth.state.user;
        }
      }
    } catch {}

    const order = {
      _id: `mock-order-${Date.now()}`,
      orderNumber: `ORD-${Date.now()}`,
      status: "PENDING",
      totalPrice: data.totalPrice,
      createdDate: new Date().toISOString(),
      orderItems,
      user: authUser,
    };

    const orders = getMockOrders();
    orders.unshift(order);
    saveMockOrders(orders);

    return { data: order };
  }
  return await api.post(`/api/orders`, data);
};

export const cancelOrder = async (id) => {
  if (!config.apiUrl) {
    const orders = getMockOrders();
    const idx = orders.findIndex((o) => o._id === id);
    if (idx !== -1) {
      orders[idx].status = "CANCELLED";
      saveMockOrders(orders);
    }
    return { data: { message: "Order cancelled." } };
  }
  return await api.patch(`/api/orders/${id}/cancel`);
};

export const payViaKhalti = async (id) => {
  if (!config.apiUrl) {
    const orders = getMockOrders();
    const idx = orders.findIndex((o) => o._id === id);
    if (idx !== -1) {
      orders[idx].status = "CONFIRMED";
      saveMockOrders(orders);
    }
    return { data: { payment_url: "https://khalti.com/" } };
  }
  return await api.put(`/api/orders/${id}/payment/khalti`);
};

export const payViaCash = async (id) => {
  if (!config.apiUrl) {
    const orders = getMockOrders();
    const idx = orders.findIndex((o) => o._id === id);
    if (idx !== -1) {
      orders[idx].status = "CONFIRMED";
      saveMockOrders(orders);
    }
    return { data: { message: "Cash payment recorded." } };
  }
  return await api.put(`/api/orders/${id}/payment/cash`);
};

export const confirmOrder = async (id, status) => {
  if (!config.apiUrl) {
    const orders = getMockOrders();
    const idx = orders.findIndex((o) => o._id === id);
    if (idx !== -1) {
      orders[idx].status = status === "success" ? "CONFIRMED" : "CANCELLED";
      saveMockOrders(orders);
    }
    return { data: { message: "Order confirmed." } };
  }
  return await api.put(`/api/orders/${id}/confirm`, { status });
};

export const updateOrderStatus = async (id, status) => {
  if (!config.apiUrl) {
    const orders = getMockOrders();
    const idx = orders.findIndex((o) => o._id === id);
    if (idx !== -1) {
      orders[idx].status = status;
      saveMockOrders(orders);
    }
    return { data: { message: "Status updated." } };
  }
  return await api.put(`/api/orders/${id}/status`, { status });
};
