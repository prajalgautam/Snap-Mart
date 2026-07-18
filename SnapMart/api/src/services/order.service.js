import crypto from "crypto";
import mongoose from "mongoose";
import { ORDER_STATUS_CANCELLED, ORDER_STATUS_CONFIRMED, ORDER_STATUS_PENDING } from "../constants/orderStatus.js";
import { PAYMENT_METHOD_CASH, PAYMENT_METHOD_ONLINE, PAYMENT_STATUS_FAILED, PAYMENT_STATUS_SUCCESS } from "../constants/payment.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Product from "../models/Product.js";
import { payViaKhalti } from "../utils/payment.js";
import userService from "./user.service.js";

const isAdmin = (user) => user.roles?.includes(ROLE_ADMIN);
const getOrders = () => Order.find().sort({ createdDate: -1 }).populate("user", "name email phone").populate("orderItems.product", "name brand category price imageUrls createdBy").populate("payment", "transactionId amount method status");
const getOrderById = async (id) => {
  const order = await Order.findById(id).populate("user", "name email phone").populate("orderItems.product", "name brand category price imageUrls createdBy").populate("payment", "transactionId amount method status");
  if (!order) throw { status: 404, message: "Order not found." };
  return order;
};
const assertAccess = async (id, authUser, { merchantAllowed = true } = {}) => {
  const order = await getOrderById(id);
  if (isAdmin(authUser) || order.user._id.toString() === authUser._id.toString()) return order;
  if (merchantAllowed && authUser.roles?.includes(ROLE_MERCHANT) && order.orderItems.some((item) => item.product?.createdBy?.toString() === authUser._id.toString())) return order;
  throw { status: 403, message: "Access denied." };
};
const createOrder = async (data, authUser) => {
  const user = await userService.getById(authUser._id, authUser);
  const shippingAddress = data.shippingAddress || user.address;
  if (!shippingAddress?.city) throw { status: 400, message: "Shipping address is required." };
  const session = await mongoose.startSession();
  try {
    let order;
    await session.withTransaction(async () => {
      const productIds = data.orderItems.map((item) => item.product);
      if (new Set(productIds).size !== productIds.length) throw { status: 400, message: "Each product may appear only once in an order." };
      const products = await Product.find({ _id: { $in: productIds } }).session(session);
      if (products.length !== productIds.length) throw { status: 400, message: "One or more products do not exist." };
      const productsById = new Map(products.map((product) => [product._id.toString(), product]));
      let totalPrice = 0;
      for (const item of data.orderItems) {
        const product = productsById.get(item.product.toString());
        const decreased = await Product.findOneAndUpdate({ _id: product._id, stock: { $gte: item.quantity } }, { $inc: { stock: -item.quantity } }, { new: true, session });
        if (!decreased) throw { status: 409, message: `${product.name} no longer has enough stock.` };
        totalPrice += product.price * item.quantity;
      }
      [order] = await Order.create([{ user: authUser._id, orderNumber: crypto.randomUUID(), orderItems: data.orderItems, shippingAddress, totalPrice }], { session });
    });
    return order;
  } finally { await session.endSession(); }
};
const updateOrderStatus = async (id, status, authUser) => {
  await assertAccess(id, authUser);
  if (!isAdmin(authUser) && status === ORDER_STATUS_CANCELLED) {
    throw { status: 403, message: "Only an admin can cancel an order." };
  }
  if (status !== ORDER_STATUS_CANCELLED) {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });
    if (!order) throw { status: 404, message: "Order not found." };
    return order;
  }
  const session = await mongoose.startSession();
  try {
    let cancelledOrder;
    await session.withTransaction(async () => {
      cancelledOrder = await Order.findOneAndUpdate({ _id: id, status: ORDER_STATUS_PENDING }, { status: ORDER_STATUS_CANCELLED }, { new: true, session });
      if (!cancelledOrder) throw { status: 409, message: "Only pending orders can be cancelled." };
      for (const item of cancelledOrder.orderItems) await Product.updateOne({ _id: item.product }, { $inc: { stock: item.quantity } }, { session });
    });
    return cancelledOrder;
  } finally { await session.endSession(); }
};
const cancelOrder = async (id, authUser) => {
  const order = await assertAccess(id, authUser, { merchantAllowed: false });
  if (order.status !== ORDER_STATUS_PENDING) throw { status: 400, message: "Only pending orders can be cancelled." };
  const session = await mongoose.startSession();
  try { await session.withTransaction(async () => {
    const result = await Order.findOneAndUpdate({ _id: id, user: authUser._id, status: ORDER_STATUS_PENDING }, { status: ORDER_STATUS_CANCELLED }, { new: true, session });
    if (!result) throw { status: 409, message: "Order can no longer be cancelled." };
    for (const item of order.orderItems) await Product.updateOne({ _id: item.product._id }, { $inc: { stock: item.quantity } }, { session });
  }); } finally { await session.endSession(); }
  return getOrderById(id);
};
const deleteOrder = async (id) => { const order = await Order.findByIdAndDelete(id); if (!order) throw { status: 404, message: "Order not found." }; };
const confirmOrder = async (id, status, authUser) => {
  const order = await assertAccess(id, authUser, { merchantAllowed: false });
  if (status?.toUpperCase() !== PAYMENT_STATUS_SUCCESS) { await Payment.findByIdAndUpdate(order.payment, { status: PAYMENT_STATUS_FAILED }); throw { status: 400, message: "Payment failed." }; }
  await Payment.findByIdAndUpdate(order.payment, { status: PAYMENT_STATUS_SUCCESS });
  return Order.findByIdAndUpdate(id, { status: ORDER_STATUS_CONFIRMED }, { new: true });
};
const getOrdersByUser = (userId, status) => Order.find(status ? { user: userId, status } : { user: userId }).sort({ createdDate: -1 }).populate("user", "name email phone").populate("orderItems.product", "name brand category price imageUrls");
const getOrdersByMerchant = async (merchantId) => {
  const productIds = await Product.find({ createdBy: merchantId }).distinct("_id");
  return Order.find({ "orderItems.product": { $in: productIds } })
    .sort({ createdDate: -1 })
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls createdBy");
};
const orderPaymentViaCash = async (id, authUser) => { const order = await assertAccess(id, authUser, { merchantAllowed: false }); const orderPayment = await Payment.create({ method: PAYMENT_METHOD_CASH, amount: order.totalPrice }); return Order.findByIdAndUpdate(id, { status: ORDER_STATUS_CONFIRMED, payment: orderPayment.id }, { new: true }); };
const orderPaymentViaKhalti = async (id, authUser) => { const order = await assertAccess(id, authUser, { merchantAllowed: false }); const orderPayment = await Payment.create({ method: PAYMENT_METHOD_ONLINE, amount: order.totalPrice }); await Order.findByIdAndUpdate(id, { payment: orderPayment.id }); return payViaKhalti({ id, amount: order.totalPrice, purchaseOrderId: order.orderNumber, purchaseOrderName: order.orderItems[0].product.name, customerInfo: { name: order.user.name, email: order.user.email, phone: order.user.phone } }); };
export default { getOrders, getOrderById, assertAccess, getOrdersByMerchant, getOrdersByUser, createOrder, updateOrderStatus, deleteOrder, cancelOrder, confirmOrder, orderPaymentViaCash, orderPaymentViaKhalti };
