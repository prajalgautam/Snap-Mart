const vendorProducts = document.querySelector("[data-vendor-products]");
const vendorOrders = document.querySelector("[data-vendor-orders]");
const vendorMetrics = document.querySelector("[data-vendor-metrics]");
const ordersKey = "snapmart-orders";

function readVendorOrders() {
  try {
    return JSON.parse(localStorage.getItem(ordersKey)) || [];
  } catch (error) {
    return [];
  }
}

function renderVendorMetrics(orders) {
  const revenue = orders.reduce((sum, order) => sum + order.summary.total, 0);
  const activeOrders = orders.filter((order) => order.status !== "Delivered").length;
  const lowStock = products.filter((product) => product.inventory <= 16).length;

  vendorMetrics.innerHTML = `
    <article>
      <span class="feature-number">01</span>
      <h2>${orders.length}</h2>
      <p>Total orders</p>
    </article>
    <article>
      <span class="feature-number">02</span>
      <h2>${activeOrders}</h2>
      <p>Active deliveries</p>
    </article>
    <article>
      <span class="feature-number">03</span>
      <h2>${formatCurrency(revenue)}</h2>
      <p>Recorded revenue</p>
    </article>
    <article>
      <span class="feature-number">04</span>
      <h2>${lowStock}</h2>
      <p>Low stock items</p>
    </article>
  `;
}

function renderVendorProducts() {
  vendorProducts.innerHTML = products
    .map(
      (product) => `
        <article class="vendor-product">
          <div class="product-image ${product.imageClass}"></div>
          <div>
            <span>${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.vendor}</p>
          </div>
          <strong>${product.inventory} in stock</strong>
        </article>
      `,
    )
    .join("");
}

function renderVendorOrders(orders) {
  if (orders.length === 0) {
    vendorOrders.innerHTML = `<p class="empty-state">No customer orders yet.</p>`;
    return;
  }

  vendorOrders.innerHTML = orders
    .slice(0, 4)
    .map(
      (order) => `
        <article class="vendor-order">
          <div>
            <span class="eyebrow">${order.status}</span>
            <h3>${order.id}</h3>
            <p>${order.customer.address}</p>
          </div>
          <strong>${formatCurrency(order.summary.total)}</strong>
        </article>
      `,
    )
    .join("");
}

if (vendorProducts && vendorOrders && vendorMetrics) {
  const orders = readVendorOrders();
  renderVendorMetrics(orders);
  renderVendorProducts();
  renderVendorOrders(orders);
}
