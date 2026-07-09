const ordersList = document.querySelector("[data-orders-list]");
const ordersEmpty = document.querySelector("[data-orders-empty]");
const ordersKey = "snapmart-orders";
const orderStatuses = ["Paid", "Preparing", "Out for delivery", "Delivered"];

function readSavedOrders() {
  try {
    return JSON.parse(localStorage.getItem(ordersKey)) || [];
  } catch (error) {
    return [];
  }
}

function writeSavedOrders(orders) {
  localStorage.setItem(ordersKey, JSON.stringify(orders));
}

function renderOrderItems(order) {
  return order.items
    .map(
      (item) => `
        <li>
          <span>${item.name} x ${item.quantity}</span>
          <strong>${formatCurrency(item.price * item.quantity)}</strong>
        </li>
      `,
    )
    .join("");
}

function createOrderCard(order) {
  const article = document.createElement("article");
  article.className = "order-card";
  article.innerHTML = `
    <div class="order-card-header">
      <div>
        <span class="eyebrow">${order.status}</span>
        <h2>${order.id}</h2>
        <p>${order.customer.name} - ${order.customer.phone}</p>
      </div>
      <strong>${formatCurrency(order.summary.total)}</strong>
    </div>
    <ul class="checkout-items">${renderOrderItems(order)}</ul>
    <div class="order-details">
      <p><strong>Address:</strong> ${order.customer.address}</p>
      <p><strong>Payment:</strong> ${order.payment?.method || "Pending"}</p>
    </div>
    <label class="status-control">
      Order status
      <select data-order-status="${order.id}">
        ${orderStatuses
          .map(
            (status) =>
              `<option value="${status}" ${status === order.status ? "selected" : ""}>${status}</option>`,
          )
          .join("")}
      </select>
    </label>
  `;

  return article;
}

function renderOrders() {
  const orders = readSavedOrders();

  if (ordersList) {
    ordersList.innerHTML = orders
      .map(createOrderCard)
      .map((order) => order.outerHTML)
      .join("");
  }

  if (ordersEmpty) {
    ordersEmpty.hidden = orders.length > 0;
  }
}

if (ordersList) {
  ordersList.addEventListener("change", (event) => {
    const orderId = event.target.dataset.orderStatus;

    if (!orderId) return;

    const orders = readSavedOrders().map((order) =>
      order.id === orderId ? { ...order, status: event.target.value } : order,
    );

    writeSavedOrders(orders);
    renderOrders();
  });

  renderOrders();
}
