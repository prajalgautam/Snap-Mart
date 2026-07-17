import config from "@/config";
import axios from "axios";

const http = axios.create({ timeout: 3000 });

// Persist mock users to localStorage so they survive page navigation
function getMockUsers() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("snapmart_mock_users");
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function saveMockUsers(users) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("snapmart_mock_users", JSON.stringify(users));
  } catch {}
}

// Seed default demo users
function seedDemoUser() {
  const users = getMockUsers();
  const hasDemo = users.some((u) => u.email === "demo@snapmart.com");
  if (!hasDemo) {
    users.push({
      _id: "mock-user-1",
      name: "Demo Customer",
      email: "demo@snapmart.com",
      phone: "9841234567",
      password: "Demo@123",
      address: { city: "Kathmandu", province: "Bagmati" },
      roles: ["CUSTOMER"],
      isActive: true,
      token: "mock-token-demo-user-001",
      profileImageUrl: null,
    });
  }

  const hasMerchant = users.some((u) => u.email === "merchant@snapmart.com");
  if (!hasMerchant) {
    users.push({
      _id: "mock-user-merchant",
      name: "ABC Owner",
      email: "merchant@snapmart.com",
      phone: "9841112222",
      password: "Merchant@123",
      address: { city: "Lalitpur", province: "Bagmati" },
      roles: ["MERCHANT"],
      isActive: true,
      shopName: "ABC Grocery Store",
      shopCategory: "Groceries",
      token: "mock-token-demo-merchant-001",
      profileImageUrl: null,
    });
  }

  const hasAdmin = users.some((u) => u.email === "admin@snapmart.com");
  if (!hasAdmin) {
    users.push({
      _id: "mock-user-admin",
      name: "Super Admin",
      email: "admin@snapmart.com",
      phone: "9841333444",
      password: "Admin@123",
      address: { city: "Kathmandu", province: "Bagmati" },
      roles: ["ADMIN"],
      isActive: true,
      token: "mock-token-demo-admin-001",
      profileImageUrl: null,
    });
  }

  saveMockUsers(users);
}

seedDemoUser();

export const login = async (data) => {
  // Always try backend first if API URL is configured
  if (config.apiUrl) {
    try {
      return await http.post(`${config.apiUrl}/api/auth/login`, data);
    } catch {}
  }

  // Fall back to mock users
  const users = getMockUsers();
  const user = users.find(
    (u) => u.email === data.email && u.password === data.password
  );

  if (!user) {
    const error = new Error("Invalid email or password.");
    error.response = {
      data: "Invalid email or password. Try: demo@snapmart.com (Customer) / merchant@snapmart.com (Merchant) / admin@snapmart.com (Admin)",
    };
    throw error;
  }

  return { data: { ...user } };
};

export const signup = async (data) => {
  // Always try backend first if API URL is configured
  if (config.apiUrl) {
    try {
      return await http.post(`${config.apiUrl}/api/auth/register`, data);
    } catch {}
  }

  // Fall back to mock
  const users = getMockUsers();
  const existing = users.find((u) => u.email === data.email);
  if (existing) {
    const error = new Error("User already exists.");
    error.response = { data: "User already exists with this email." };
    throw error;
  }

  const newUser = {
    _id: `mock-user-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    address: data.address || { city: "Kathmandu", province: "Bagmati" },
    roles: data.roles || ["CUSTOMER"],
    shopName: data.shopName || null,
    shopCategory: data.shopCategory || null,
    isActive: true,
    token: `mock-token-${Date.now()}`,
    profileImageUrl: null,
  };

  users.push(newUser);
  saveMockUsers(users);

  return { data: { ...newUser } };
};

export const forgotPassword = async (data) => {
  if (!config.apiUrl) {
    return { data: { message: "Reset link sent to your email." } };
  }
  return await http.post(`${config.apiUrl}/api/auth/forgot-password`, data);
};

export const resetPassword = async (data) => {
  if (!config.apiUrl) {
    return { data: { message: "Password reset successfully." } };
  }
  return await http.post(`${config.apiUrl}/api/auth/reset-password`, data);
};
